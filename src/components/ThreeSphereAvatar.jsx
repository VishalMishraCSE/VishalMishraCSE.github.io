import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeSphereAvatar() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth || 58;
        const height = container.clientHeight || 58;

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10);
        camera.position.set(0, 0, 2.5);

        // Renderer with antialiasing and transparency
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace; // CRITICAL: correct color space for rich colors
        // Tone mapping disabled to prevent image desaturation/fogginess
        container.appendChild(renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        // Main key light for reflections and specularity
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
        dirLight.position.set(3, 3, 5);
        scene.add(dirLight);

        // Warm ambient light from behind for refraction coloring
        const pointLight = new THREE.PointLight(0xe8a84c, 2.0, 5);
        pointLight.position.set(-1, -1, -0.8);
        scene.add(pointLight);

        // Group to hold all rotatable elements
        const rootGroup = new THREE.Group();
        scene.add(rootGroup);

        // Outer Glass Sphere
        const glassGeometry = new THREE.SphereGeometry(0.9, 48, 48);
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.08, // Very faint diffuse contribution to let inside card shine through
            roughness: 0.1,
            metalness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05,
            depthWrite: false // CRITICAL: do not write to depth buffer to avoid occluding inner photo
        });
        const glassSphere = new THREE.Mesh(glassGeometry, glassMaterial);
        glassSphere.renderOrder = 2; // Glass rendered on top of inner photo card
        rootGroup.add(glassSphere);

        // Outer Gimbal Ring (Yaw)
        const ring1Geo = new THREE.TorusGeometry(0.87, 0.012, 8, 48);
        const ring1Mat = new THREE.MeshStandardMaterial({
            color: 0xc87d2f, // Amber glow
            metalness: 0.9,
            roughness: 0.15,
            transparent: true,
            opacity: 0.8,
            depthWrite: false
        });
        const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
        ring1.renderOrder = 3; // Gimbal rings rendered on outer shell layer
        rootGroup.add(ring1);

        // Inner Gimbal Ring (Pitch - rotated 90deg on Y)
        const ring2Geo = new THREE.TorusGeometry(0.80, 0.008, 8, 48);
        const ring2Mat = new THREE.MeshStandardMaterial({
            color: 0x5a6c50, // Sage/olive green
            metalness: 0.9,
            roughness: 0.15,
            transparent: true,
            opacity: 0.7,
            depthWrite: false
        });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ring2.rotation.y = Math.PI / 2;
        ring2.renderOrder = 3;
        rootGroup.add(ring2);

        // Stable Portrait Card Mesh inside the sphere
        const photoGeometry = new THREE.CircleGeometry(0.56, 64);
        let photoMesh;

        // Load portrait texture
        const loader = new THREE.TextureLoader();
        loader.load('/profile_pic.jpeg', (texture) => {
            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;
            texture.colorSpace = THREE.SRGBColorSpace; // CRITICAL: correct color space for texture

            // Crop and zoom in on the head/face area so it is clearly visible in the avatar
            // Photo dimensions: 1090x1599, aspect ratio = 0.6817. Zoom factor = 1.45.
            const imageAspect = 1090 / 1599;
            const zoom = 1.45;
            const repeatX = 1 / zoom;
            const repeatY = imageAspect / zoom;
            texture.repeat.set(repeatX, repeatY);
            // Center horizontally, and align vertically near the top to focus on head/face
            texture.offset.set((1 - repeatX) / 2, 1 - repeatY - 0.05);
            texture.needsUpdate = true; // Force GPU update

            const photoMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                side: THREE.DoubleSide
            });

            photoMesh = new THREE.Mesh(photoGeometry, photoMaterial);
            // Position it perfectly in the center, slightly forward
            photoMesh.position.set(0, 0, 0.02);
            photoMesh.renderOrder = 1; // Render photo mesh first, so transparent overlays blend on top
            scene.add(photoMesh); // Add directly to scene so it does not rotate with rootGroup!
        });

        // Scroll Tracking
        let lastScrollY = window.scrollY;
        let targetScrollSpeed = 0;
        let currentScrollSpeed = 0;

        const onScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;
            lastScrollY = currentScrollY;

            // Add scroll velocity to rotation target
            targetScrollSpeed = delta * 0.015;
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        // Mouse Tracking (for parallax look-at)
        let targetMouseX = 0;
        let targetMouseY = 0;

        const onMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            targetMouseX = x * 0.35; // camera shift amount
            targetMouseY = -y * 0.35;
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });

        // Animation loop
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            // Interpolate scroll speed with decay
            currentScrollSpeed += (targetScrollSpeed - currentScrollSpeed) * 0.08;
            targetScrollSpeed *= 0.92;

            // Spin gimbal components
            // Glass sphere rolls matching scroll speed
            glassSphere.rotation.x += currentScrollSpeed;
            glassSphere.rotation.y += 0.003; // Gentle idle spin

            // Gimbal rings counter-rotate for high-tech look
            ring1.rotation.y += currentScrollSpeed * 1.5 + 0.005;
            ring1.rotation.z += 0.002;
            
            ring2.rotation.x += currentScrollSpeed * 0.8 + 0.003;
            ring2.rotation.z -= 0.001;

            // Camera shift based on mouse move
            camera.position.x += (targetMouseX - camera.position.x) * 0.08;
            camera.position.y += (targetMouseY - camera.position.y) * 0.08;
            camera.lookAt(scene.position);

            // Tilt the stable portrait mesh inside to follow camera slightly, enhancing depth
            if (photoMesh) {
                photoMesh.rotation.y = camera.position.x * 0.25;
                photoMesh.rotation.x = camera.position.y * 0.25;
            }

            renderer.render(scene, camera);
        };

        animate();

        // Resize Observer
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const w = entry.contentRect.width || 58;
                const h = entry.contentRect.height || 58;
                renderer.setSize(w, h);
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
            }
        });
        resizeObserver.observe(container);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('mousemove', onMouseMove);
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameId);

            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }

            glassGeometry.dispose();
            glassMaterial.dispose();
            ring1Geo.dispose();
            ring1Mat.dispose();
            ring2Geo.dispose();
            ring2Mat.dispose();
            photoGeometry.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            style={{ 
                width: '100%', 
                height: '100%', 
                position: 'absolute', 
                inset: 0,
                borderRadius: '50%',
                overflow: 'hidden'
            }} 
        />
    );
}
