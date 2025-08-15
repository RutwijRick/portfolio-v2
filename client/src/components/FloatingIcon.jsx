import React, { useRef } from "react";
import * as THREE from "three";
import { Float } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const FloatingIcon = ({ textureUrl, position }) => {
    const texture = useTexture(textureUrl);
    const meshRef = useRef();

    // Rotate slowly for extra life
    // useFrame((state, delta) => {
    //     if (meshRef.current) {
    //         meshRef.current.rotation.y += delta * 0.3;
    //     }
    // });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <mesh ref={meshRef} position={position}>
                {/* Use plane instead of sphere for better icon visibility */}
                <planeGeometry args={[1.2, 1.2]} />
                <meshStandardMaterial
                    map={texture}
                    transparent
                    side={THREE.DoubleSide}
                    emissive={new THREE.Color("#7dd3fc")}
                    emissiveIntensity={0.4}
                    opacity={0.95}
                />
            </mesh>
        </Float>
    );
};

export default FloatingIcon;
