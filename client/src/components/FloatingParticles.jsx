import * as THREE from "three";
import { useRef, useState, useEffect } from "react";

function FloatingParticles() {
    const points = useRef();
    const [positions] = useState(() => {
        const arr = new Float32Array(8000); // more points for density
        for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - 0.5) * 50;
        return arr;
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
                size={0.15}
                map={circleTexture}
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
