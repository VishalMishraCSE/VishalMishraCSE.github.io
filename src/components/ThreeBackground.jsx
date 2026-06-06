import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Colors from our HSL CSS variables: --amber (#c87d2f) and --olive (#5a6c50)
        const colors = [
            new THREE.Color('#c87d2f'), // Amber
            new THREE.Color('#e8a84c'), // Amber light
            new THREE.Color('#5a6c50'), // Olive
            new THREE.Color('#8fa582'), // Sage
        ];

        // Scene setup
        const scene = new THREE.Scene();
        
        // Camera setup
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 30;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // Particle System Setup
        const particleCount = 600;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colorArray = new Float32Array(particleCount * 3);
        const initialPositions = []; // To store for animations

        for (let i = 0; i < particleCount; i++) {
            // Distribute particles in a large sphere/box
            const radius = Math.random() * 20 + 5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            initialPositions.push({ x, y, z, speed: Math.random() * 0.02 + 0.005 });

            // Random color from our palette
            const color = colors[Math.floor(Math.random() * colors.length)];
            colorArray[i * 3] = color.r;
            colorArray[i * 3 + 1] = color.g;
            colorArray[i * 3 + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        // Create a circular particle texture using HTML Canvas
        const createParticleTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 16;
            canvas.height = 16;
            const ctx = canvas.getContext('2d');
            const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
            grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 16, 16);
            return new THREE.CanvasTexture(canvas);
        };

        const material = new THREE.PointsMaterial({
            size: 0.28,
            map: createParticleTexture(),
            vertexColors: true,
            transparent: true,
            opacity: 0.45,
            blending: THREE.NormalBlending,
            depthWrite: false,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // Interaction state
        let mouseX = 0;
        let mouseY = 0;
        let targetMouseX = 0;
        let targetMouseY = 0;
        let scrollY = 0;

        const onMouseMove = (e) => {
            targetMouseX = (e.clientX / window.innerWidth - 0.5) * 4;
            targetMouseY = (e.clientY / window.innerHeight - 0.5) * -4;
        };

        const onScroll = () => {
            scrollY = window.scrollY;
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('scroll', onScroll);

        // Resize handler
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        // Animation loop
        let animationFrameId;
        let clock = new THREE.Clock();

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();

            // Smoothly interpolate mouse movement
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            // Slowly rotate the entire particle cloud
            points.rotation.y = elapsedTime * 0.015 + (scrollY * 0.0003);
            points.rotation.x = elapsedTime * 0.008 + (mouseX * 0.02);
            points.rotation.z = mouseX * 0.01;

            // Animate individual points slightly (wave effect)
            const positionsArr = points.geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                const initial = initialPositions[i];
                const index = i * 3;
                
                // Add a wave offset to y and z positions
                positionsArr[index + 1] = initial.y + Math.sin(elapsedTime * 0.5 + initial.x) * 0.15;
                positionsArr[index + 2] = initial.z + Math.cos(elapsedTime * 0.5 + initial.y) * 0.15;
            }
            points.geometry.attributes.position.needsUpdate = true;

            // Gentle parallax movement of the camera
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(animationFrameId);
            
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return <div className="three-canvas-container" ref={containerRef} />;
}
