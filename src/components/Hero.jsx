import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import ThreeProfileCard from './ThreeProfileCard';


function StatCounter({ value, decimals = 0, suffix = '' }) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStarted(true);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!started) return;

        let startTimestamp = null;
        const endValue = parseFloat(value);
        const duration = 2000;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // easeOutExpo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            setCount(easeProgress * endValue);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [started, value]);

    return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
}

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    const headingWordVariants = {
        hidden: { y: '120%' },
        show: { 
            y: 0, 
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    return (
        <section id="hero" className="hero">
            <div className="hero-bg">
                <div className="hero-blob hero-blob--1" />
                <div className="hero-blob hero-blob--2" />
                <div className="hero-blob hero-blob--3" />
            </div>

            <div className="container hero-grid">
                <motion.div 
                    className="hero-left"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div className="hero-tag" variants={itemVariants}>
                        <span className="tag-dot" />
                        <span className="tag-text">Open to opportunities</span>
                    </motion.div>

                    <h1 className="hero-heading">
                        <span className="h-line">
                            <motion.span className="h-word" variants={headingWordVariants}>Hey, I'm</motion.span>
                        </span>
                        <span className="h-line">
                            <motion.span className="h-word hero-name-accent" variants={headingWordVariants}>Vishal Mishra</motion.span>
                        </span>
                    </h1>

                    <motion.p className="hero-sub" variants={itemVariants}>
                        I build <em>intelligent software</em> at the intersection of <strong>full-stack development</strong> and <strong>AI/ML engineering</strong>. Currently in my final year, shipping real products that matter.
                    </motion.p>

                    <motion.div className="hero-buttons" variants={itemVariants}>
                        <a href="#work" className="btn btn--fill" data-scroll-to>
                            <span>View my work</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a href="#contact" className="btn btn--outline" data-scroll-to>
                            <span>Get in touch</span>
                        </a>
                    </motion.div>

                    <motion.div className="hero-social-row" variants={itemVariants}>
                        <a href="https://github.com/VishalMishraCSE" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github" /></a>
                        <a href="https://www.linkedin.com/in/vishal-mishra-002727298" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
                        <a href="mailto:vishalmishra.csm@gmail.com" aria-label="Email"><i className="fas fa-envelope" /></a>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className="hero-right"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    <div className="hero-bento">
                        {/* Stats card (spans 2 cols) */}
                        <motion.div className="bento-card bento-card--stats glass-warm" variants={itemVariants}>
                            <div className="bento-stat">
                                <span className="bento-stat-val">
                                    <StatCounter value="8.70" decimals={2} />
                                </span>
                                <span className="bento-stat-label">CGPA</span>
                            </div>
                            <div className="bento-stat">
                                <span className="bento-stat-val">
                                    <StatCounter value="150" suffix="+" />
                                </span>
                                <span className="bento-stat-label">LeetCode</span>
                            </div>
                            <div className="bento-stat">
                                <span className="bento-stat-val">
                                    <StatCounter value="3" suffix="+" />
                                </span>
                                <span className="bento-stat-label">Internships</span>
                            </div>
                        </motion.div>
                        
                        {/* Interactive 3D WebGL Hologram Profile card */}
                        <motion.div className="bento-card bento-card--profile glass-warm" variants={itemVariants}>
                            <ThreeProfileCard />
                        </motion.div>

                        {/* Status card (spans 1 col now!) */}
                        <motion.div className="bento-card bento-card--status glass-warm" variants={itemVariants}>
                            <div className="status-indicator">
                                <span className="status-dot" />
                                <span>Currently building at</span>
                            </div>
                            <h4>MWA TransLogistics</h4>
                            <p>Full Stack Intern</p>
                        </motion.div>
                        
                        {/* Achievement card (spans 1 col) */}
                        <motion.div className="bento-card bento-card--achievement glass-warm" variants={itemVariants}>
                            <i className="fas fa-trophy" />
                            <div>
                                <h4>2× College SIH Winner</h4>
                                <p>Smart India Hackathon</p>
                            </div>
                        </motion.div>
                        
                        {/* Club card (spans 1 col) */}
                        <motion.div className="bento-card bento-card--club glass-warm" variants={itemVariants}>
                            <i className="fas fa-users" />
                            <div>
                                <h4>AI Club President</h4>
                                <p>50+ members · Led & founded</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <motion.div 
                className="hero-scroll-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.0 }}
            >
                <div className="scroll-hint-line" />
                <span>Scroll to explore my story</span>
            </motion.div>
        </section>
    );
}
