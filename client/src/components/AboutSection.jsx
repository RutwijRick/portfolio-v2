import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, useTexture } from "@react-three/drei";
import { motion } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import techStacks from "../data/techStacks";
import FloatingIcon from "./FloatingIcon";
import { slideRight } from "../anims/animations";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const containerRef = useRef(null);
    const [activeStack, setActiveStack] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const totalStages = techStacks.length + 1; // intro + stacks
            const stageHeight = 800;
            const totalScroll = totalStages * stageHeight;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${totalScroll}`,
                    pin: true,
                    scrub: true,
                    onUpdate: (self) => {
                        // Convert scroll progress into stack index
                        const stageIndex = Math.floor(self.progress * totalStages);
                        // Clamp to array length
                        const safeIndex = Math.min(stageIndex, techStacks.length - 1);
                        setActiveStack(safeIndex);
                    },
                },
            });

            // Intro animation
            tl.fromTo(
                "[data-about-text]",
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto px-6 py-20 min-h-screen"
        >
            {/* Left side — About Me & Tech Stacks */}
            <div>
                <motion.div
                    variants={slideRight}
                    initial="hidden"
                    animate="visible"
                    className="space-y-5"
                >
                    <h2 className="text-4xl font-bold mb-6">About Me</h2>
                    <p className="text-neutral-400 leading-relaxed mb-8">
                        Full Stack Developer with over 5 years of hands-on experience
                        designing, developing, and deploying scalable web applications.
                    </p>
                    <h3 className="text-2xl font-semibold mb-6">My Tech Stack:</h3>
                </motion.div>

                {/* Tech Stack Card */}
                <motion.div
                    key={activeStack}
                    data-stack={activeStack}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-6 rounded-3xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur border border-neutral-200 dark:border-neutral-800 shadow-xl"
                >
                    <div className="text-sm uppercase tracking-wider mb-2 opacity-70">
                        {techStacks[activeStack].subtitle || "Tech Stack"}
                    </div>
                    <div className="text-2xl font-semibold mb-3">
                        {techStacks[activeStack].title}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {techStacks[activeStack].items.map((item) => (
                            <span
                                key={item}
                                className="px-3 py-1 text-sm rounded-full bg-neutral-200/60 dark:bg-neutral-800/60"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Right side — Floating 3D Icons */}
            <div className="h-[500px]">
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[3, 3, 5]} intensity={1.4} />
                    {techStacks[activeStack].icons.map((icon, idx) => (
                        <FloatingIcon
                            key={icon}
                            textureUrl={icon}
                            position={[
                                Math.sin(idx) * 2,
                                Math.cos(idx) * 2,
                                (Math.random() - 0.5) * 2,
                            ]}
                        />
                    ))}
                    {/* <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.6}
                    /> */}
                </Canvas>
            </div>
        </div>
    );
}
