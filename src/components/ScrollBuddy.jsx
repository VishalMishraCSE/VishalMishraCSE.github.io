import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeSphereAvatar from './ThreeSphereAvatar';


const guideDialogue = {
    hero: {
        title: "Prologue: Welcome",
        chapter: "Intro",
        text: "Hey there! I'm Vishal. Welcome to my digital space. Scroll down to take a cinematic walk through my work and achievements."
    },
    about: {
        title: "Chapter 1: Curiosity",
        chapter: "About Me",
        text: "Curiosity is my driver. I study AI & ML at CMR, founded the college AI Club, and build projects with real human impact."
    },
    journey: {
        title: "Chapter 2: The Path",
        chapter: "Journey",
        text: "Here's my path: from college studies to full-stack engineering internships at MWA TransLogistics and Viswam AI."
    },
    work: {
        title: "Chapter 3: Shipped Work",
        chapter: "Featured Projects",
        text: "Click 'Read Story' on Vidyora (LMS), NIDS-ML (Network Security), or Agri_Rover (Farming IoT) to inspect code and details!"
    },
    skills: {
        title: "Chapter 4: Tech Arsenal",
        chapter: "Skills",
        text: "These are the languages, frameworks, and AI tools I use. Python, React, and Machine Learning are my favorites."
    },
    recognition: {
        title: "Chapter 5: Selected Wins",
        chapter: "Awards & Certs",
        text: "I won the SIH college-level selections twice, visited IIT Bombay's E-Cell, and cleared Google Cloud tracks!"
    },
    contact: {
        title: "Epilogue: Connect",
        chapter: "Get In Touch",
        text: "We reached the end of the story! Let's build something amazing together. Reach out on LinkedIn or Email."
    }
};

export default function ScrollBuddy() {
    const [activeSection, setActiveSection] = useState('hero');
    const [isBubbleVisible, setIsBubbleVisible] = useState(true);

    // Track active section on scroll
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const observerOptions = {
            root: null,
            rootMargin: '-35% 0px -40% 0px', // Trigger near center screen
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    if (guideDialogue[id]) {
                        setActiveSection(id);
                        // Trigger speech bubble entry animation
                        setIsBubbleVisible(false);
                        setTimeout(() => setIsBubbleVisible(true), 50);
                    }
                }
            });
        }, observerOptions);

        sections.forEach(sec => observer.observe(sec));

        return () => observer.disconnect();
    }, []);

    const currentDialogue = guideDialogue[activeSection] || guideDialogue.hero;

    return (
        <div className="scroll-buddy">
            {/* Speech bubble commentary */}
            <AnimatePresence mode="wait">
                {isBubbleVisible && (
                    <motion.div 
                        key={activeSection}
                        className="buddy-bubble"
                        initial={{ opacity: 0, x: -15, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -15, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    >
                        <div className="buddy-bubble-title">{currentDialogue.title}</div>
                        <p className="buddy-bubble-text">{currentDialogue.text}</p>
                        <span className="buddy-chapter-indicator">{currentDialogue.chapter}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pulsing 3D Guide Avatar Ball */}
            <motion.div 
                className="buddy-avatar-wrapper"
                key={activeSection + '-avatar'}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                onClick={() => {
                    const target = document.getElementById(activeSection);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
            >
                <ThreeSphereAvatar />
                <div className="buddy-pulse-ring" />
            </motion.div>
        </div>
    );
}
