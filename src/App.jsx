import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Lenis from 'lenis';

// CSS Files
import './App.css';

// Components
import Loader from './components/Loader';
import ThreeBackground from './components/ThreeBackground';
import Hero from './components/Hero';
import About from './components/About';
import EditorialQuote from './components/EditorialQuote';
import Marquee from './components/Marquee';
import Journey from './components/Journey';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Recognition from './components/Recognition';
import Contact from './components/Contact';
import ScrollBuddy from './components/ScrollBuddy';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Page scroll progress
    const { scrollYProgress } = useScroll();

    // 1. Navigation scroll state
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 2. Dynamic background theme switcher on scroll
    useEffect(() => {
        if (isLoading) return;

        const sections = document.querySelectorAll('section[id]');
        const observerOptions = {
            root: null,
            rootMargin: '-25% 0px -45% 0px', // Trigger theme change as section hits center-ish screen
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    document.body.setAttribute('data-active-theme', sectionId);
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, [isLoading]);

    // 3. Smooth scrolling using Lenis + Anchor links binding
    useEffect(() => {
        if (isLoading) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.5,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Scroll to target handler
        const handleScrollTo = (e) => {
            const btn = e.target.closest('[data-scroll-to]');
            if (btn) {
                e.preventDefault();
                const targetId = btn.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    lenis.scrollTo(targetElement);
                    setMobileMenuOpen(false);
                }
            }
        };

        document.addEventListener('click', handleScrollTo);

        return () => {
            lenis.destroy();
            document.removeEventListener('click', handleScrollTo);
        };
    }, [isLoading]);

    return (
        <>
            <Loader onComplete={() => setIsLoading(false)} />
            
            {!isLoading && (
                <>
                    {/* Interactive ThreeJS background */}
                    <ThreeBackground />
                    
                    {/* Scroll progress bar */}
                    <motion.div 
                        className="progress-bar" 
                        style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                    />

                    {/* Navigation */}
                    <header className={`nav ${isScrolled ? 'scrolled' : ''}`}>
                        <a href="#hero" className="nav-brand" data-scroll-to>
                            <span className="brand-text">Vishal<span className="brand-dot">.</span></span>
                        </a>
                        <nav className="nav-menu">
                            <a href="#about" className="nav-item" data-scroll-to>About</a>
                            <a href="#journey" className="nav-item" data-scroll-to>Journey</a>
                            <a href="#work" className="nav-item" data-scroll-to>Work</a>
                            <a href="#skills" className="nav-item" data-scroll-to>Skills</a>
                            <a href="#recognition" className="nav-item" data-scroll-to>Recognition</a>
                            <a href="#contact" className="nav-item nav-item--cta" data-scroll-to>Let's Talk</a>
                        </nav>
                        <button 
                            className={`nav-burger ${mobileMenuOpen ? 'active' : ''}`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span /><span /><span />
                        </button>
                    </header>

                    {/* Mobile Menu */}
                    <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
                        <nav className="mobile-nav-inner">
                            <a href="#about" className="mobile-nav-link" data-scroll-to>About</a>
                            <a href="#journey" className="mobile-nav-link" data-scroll-to>Journey</a>
                            <a href="#work" className="mobile-nav-link" data-scroll-to>Work</a>
                            <a href="#skills" className="mobile-nav-link" data-scroll-to>Skills</a>
                            <a href="#recognition" className="mobile-nav-link" data-scroll-to>Recognition</a>
                            <a href="#contact" className="mobile-nav-link" data-scroll-to>Contact</a>
                        </nav>
                    </div>

                    {/* Main Content Sections */}
                    <main>
                        <Hero />
                        <About />
                        <EditorialQuote />
                        <Marquee />
                        <Journey />
                        <Projects />
                        <Skills />
                        <Recognition />
                        <Contact />
                    </main>

                    {/* Interactive Floating Progress Buddy */}
                    <ScrollBuddy />

                    {/* Footer */}
                    <footer className="footer">
                        <div className="container footer-inner">
                            <p>&copy; {new Date().getFullYear()} Vishal Mishra. Crafted with passion.</p>
                            <p>Built with <span className="heart">♥</span> from Hyderabad</p>
                        </div>
                    </footer>
                </>
            )}
        </>
    );
}
