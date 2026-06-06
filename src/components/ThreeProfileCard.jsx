import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ThreeProfileCard() {
    const cardRef = useRef(null);

    // Motion values for normalized mouse positions (-0.5 to 0.5)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics config for natural inertia
    const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

    // Glare position coordinates mapping to percentage (0% to 100%)
    const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
    const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);
    const glareOpacity = useSpring(useMotionValue(0), springConfig);

    // Push effects for child layers to create depth parallax
    const imgTranslateZ = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), springConfig);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        
        // Calculate normalized coordinates (-0.5 to 0.5)
        const posX = (e.clientX - rect.left) / rect.width - 0.5;
        const posY = (e.clientY - rect.top) / rect.height - 0.5;
        
        x.set(posX);
        y.set(posY);
        glareOpacity.set(0.28); // Show soft glare sheen on hover
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        glareOpacity.set(0); // Hide glare sheen on leave
    };

    // Calculate dynamic gradient string
    const glareBackground = useTransform(
        [glareX, glareY],
        ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 80%)`
    );

    return (
        <div 
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '1000px',
                background: '#1a1814', // Solid dark slate backing matching theme colors
                overflow: 'hidden',
                borderRadius: 'inherit'
            }}
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                    cursor: 'pointer',
                    borderRadius: 'inherit'
                }}
            >
                {/* 1. Main Portrait Image with 3D Depth Push */}
                <motion.img 
                    src="/profile_pic.jpeg" 
                    alt="Vishal Mishra"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        // Align near the top of the photo to keep face in focus
                        objectPosition: 'center 8%', 
                        // Zoom in slightly (1.2x) to crop out the ugly side walls and pillars
                        transform: 'translateZ(10px) scale(1.20)', 
                        x: imgTranslateZ, // Subtle horizontal shift on mouse move
                        borderRadius: 'inherit',
                        display: 'block'
                    }}
                />

                {/* 2. Glass Specular Glare Overlay */}
                <motion.div 
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 2,
                        background: glareBackground,
                        opacity: glareOpacity,
                        pointerEvents: 'none',
                        mixBlendMode: 'overlay',
                        borderRadius: 'inherit'
                    }}
                />

                {/* 3. Subtle Glowing Border Overlay (Pushed forward in 3D) */}
                <motion.div 
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 3,
                        border: '1.5px solid rgba(255, 255, 255, 0.08)',
                        pointerEvents: 'none',
                        borderRadius: 'inherit',
                        transform: 'translateZ(20px)'
                    }}
                />
            </motion.div>
        </div>
    );
}
