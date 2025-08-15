import { motion } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
    hidden: { y: 40, opacity: 0 },
    visible: (delay = 0) => ({
        y: 0,
        opacity: 1,
        transition: { delay, duration: 0.8, ease: "easeOut" }
    })
};

const slideRight = {
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" }
  }
};

export default function HeroSection({ scrollTo, workRef, contactRef, loaded }) {
    const containerRef = useRef(null);

    const cards = [
        {
            title: "Building delightful dashboards",
            subtitle: "Expertise",
            details: "React · Angular · NodeJS · NextJS · NestJS",
            delay: 1 + 1
        },
        {
            title: "Relational, Graphical, Distributed & NoSQL",
            subtitle: "Databases",
            details: "MySQL · PostgreSQL · MongoDB · Kafka · CouchDB",
            delay: 1 + 1.5
        },
        {
            title: "Containerization & Orchestration",
            subtitle: "Cloud",
            details: "AWS · Jenkins · Docker · Kubernetes · CI/CD",
            delay: 1 + 2
        }
    ];

    return (
        <div
            ref={containerRef}
            className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center"
        >
            {/* Floating background particles */}
            <div className="absolute inset-0 -z-10 pointer-events-none opacity-30">
                {/* Hook into your FloatingParticles component */}
            </div>

            {/* Left side: Intro */}
            {/* Left Side — Slide Right & Fade */}
      <motion.div
        variants={slideRight}
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
        className="space-y-5"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Full-Stack Developer
          <br />
          <span className="opacity-80">Crafting Alive Interfaces</span>
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 max-w-prose">
          5+ years building high-impact admin dashboards, e-commerce & SaaS apps. I obsess over
          fluid motion, crisp UX and scalable backends.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => scrollTo(workRef)}
            className="px-4 py-2 rounded-2xl border border-neutral-300 dark:border-neutral-700"
          >
            View Work
          </button>
          <button
            onClick={() => scrollTo(contactRef)}
            className="px-4 py-2 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
          >
            Contact
          </button>
        </div>
      </motion.div>

            {/* Right side: Expertise cards */}
            {/* Right Side Cards */}
            <motion.div
                className="grid gap-6"
                initial="hidden"
                animate={loaded ? "visible" : "hidden"}
            >
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        variants={fadeUp}
                        custom={1.2 + i * 0.3} // delay per card
                        animate={loaded ? fadeUp.visible(1.2 + i * 0.3) : fadeUp.hidden}
                        className="p-6 rounded-3xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur border border-neutral-200 dark:border-neutral-800 shadow-xl"
                    >
                        <div className="text-sm uppercase tracking-wider mb-2 opacity-70">{card.subtitle}</div>
                        <div className="text-2xl font-semibold">{card.title}</div>
                        <div className="mt-3 text-sm opacity-70">{card.details}</div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
