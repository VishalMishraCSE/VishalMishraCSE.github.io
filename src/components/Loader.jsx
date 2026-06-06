import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.floor(Math.random() * 15 + 5);
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsDismissed(true);
                    }, 400);
                    return 100;
                }
                return next;
            });
        }, 120);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {!isDismissed && (
                <motion.div 
                    className="loader"
                    exit={{ pointerEvents: 'none' }}
                    style={{ position: 'fixed', inset: 0, zIndex: 10000 }}
                >
                    {/* Left curtain panel */}
                    <motion.div 
                        className="loader-curtain loader-curtain--left"
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                    />
                    
                    {/* Right curtain panel */}
                    <motion.div 
                        className="loader-curtain loader-curtain--right"
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                    />
                    
                    {/* Centered counter and label */}
                    <motion.div 
                        className="loader-inner"
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <div className="loader-counter">
                            <span>{progress}</span>
                        </div>
                        <div className="loader-bar">
                            <div 
                                className="loader-bar-inner" 
                                style={{ width: `${progress}%`, transition: 'width 0.1s ease-out' }} 
                            />
                        </div>
                        <p className="loader-label">building experience</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
