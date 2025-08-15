import React from 'react'
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";

const GooeyOrb = ({ theme }) => {
    return (
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[3, 3, 5]} intensity={1.4} />
            <Float speed={1.2} rotationIntensity={1} floatIntensity={1.5}>
                <Sphere args={[1.2, 64, 64]}>
                    <MeshDistortMaterial
                        distort={0.45}
                        speed={2}
                        roughness={0.15}
                        metalness={0.8}
                        envMapIntensity={1}
                        color="#7dd3fc"
                    />
                </Sphere>
            </Float>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
        </Canvas>
    )
}

export default GooeyOrb