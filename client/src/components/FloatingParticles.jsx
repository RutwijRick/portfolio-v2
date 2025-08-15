import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

function FloatingParticles({ count = 8000, spread = 20, near = -4, far = 6, frontNear = 0.5, frontFar = 4 }) {
    const points = useRef();
    const [positions] = useState(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * spread;
            const y = (Math.random() - 0.5) * spread;
            let z;
            if (Math.random() > 0.5) {
                // In front of orb
                z = Math.random() * (frontFar - frontNear) + frontNear;
            } else {
                // Behind orb
                z = Math.random() * (far - near) + near;
            }
            arr[i * 3] = x;
            arr[i * 3 + 1] = y;
            arr[i * 3 + 2] = z;
        }
        return arr;
    });

    // Scroll factor
    const [scrollFactor, setScrollFactor] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            setScrollFactor(window.scrollY / maxScroll);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useFrame(({ clock }) => {
        const elapsed = clock.getElapsedTime();
        if (points.current) {
            // Slow base rotation for depth illusion
            // points.current.rotation.y = Math.sin(elapsed * 0.1) * 0.05;
            // points.current.rotation.x = Math.sin(elapsed * 0.1) * 0.05;
            // points.current.rotation.z = Math.sin(elapsed * 0.1) * 0.05;

            // Stronger scroll-based Z parallax (fly-through effect)
            points.current.position.x = scrollFactor * -5;
            points.current.position.y = scrollFactor * -5;
            points.current.position.z = scrollFactor * -5;
        }
    });

    // Create a circular sprite texture
    const circleTexture = useState(() => {
        const size = 64;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createRadialGradient(
            size / 2,
            size / 2,
            0,
            size / 2,
            size / 2,
            size / 2
        );
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.4, "rgba(255,255,255,0.5)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        return new THREE.CanvasTexture(canvas);
    })[0];

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                map={circleTexture}
                // alphaTest={0.01}
                alphaMap={circleTexture}
                transparent
                opacity={0.8}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default FloatingParticles;
