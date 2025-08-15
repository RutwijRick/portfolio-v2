import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import './index.css';
import GooeyOrb from "./components/GooeyOrb";

gsap.registerPlugin(ScrollTrigger);

// ---- Demo Data (replace with your top 5–10 projects) ----------------------------------------
const projects = [
  {
    id: 1,
    title: "E‑Commerce Admin",
    summary: "Headless commerce admin for 10k+ SKUs, role-based dashboards, real-time analytics.",
    stack: ["React", "Node", "MongoDB", "Redis"],
    img: "/projects/ecom-admin.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "SaaS Billing Suite",
    summary: "Subscriptions, metered billing, webhook integrations, multi-tenant access.",
    stack: ["Next.js", "NestJS", "PostgreSQL"],
    img: "/projects/saas-billing.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Ops Dashboard",
    summary: "Operational KPIs, queues, drill-down charts, RBAC, audit trails.",
    stack: ["React", "FastAPI", "TimescaleDB"],
    img: "/projects/ops-dashboard.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "Attendance System",
    summary: "MERN-based attendance with check-in/out, PDF/CSV exports, cron reminders.",
    stack: ["MongoDB", "Express", "React", "Node"],
    img: "/projects/attendance.jpg",
    link: "#",
  },
  {
    id: 5,
    title: "Vendor Portal",
    summary: "Bulk orders, procurement workflows, SLA tracking, invoice automation.",
    stack: ["React", "Spring Boot", "MySQL"],
    img: "/projects/vendor-portal.jpg",
    link: "#",
  },
  {
    id: 6,
    title: "E‑Commerce Admin",
    summary: "Headless commerce admin for 10k+ SKUs, role-based dashboards, real-time analytics.",
    stack: ["React", "Node", "MongoDB", "Redis"],
    img: "/projects/ecom-admin.jpg",
    link: "#",
  },
  {
    id: 7,
    title: "SaaS Billing Suite",
    summary: "Subscriptions, metered billing, webhook integrations, multi-tenant access.",
    stack: ["Next.js", "NestJS", "PostgreSQL"],
    img: "/projects/saas-billing.jpg",
    link: "#",
  },
  {
    id: 8,
    title: "Ops Dashboard",
    summary: "Operational KPIs, queues, drill-down charts, RBAC, audit trails.",
    stack: ["React", "FastAPI", "TimescaleDB"],
    img: "/projects/ops-dashboard.jpg",
    link: "#",
  },
  {
    id: 9,
    title: "Attendance System",
    summary: "MERN-based attendance with check-in/out, PDF/CSV exports, cron reminders.",
    stack: ["MongoDB", "Express", "React", "Node"],
    img: "/projects/attendance.jpg",
    link: "#",
  },
  {
    id: 10,
    title: "Vendor Portal",
    summary: "Bulk orders, procurement workflows, SLA tracking, invoice automation.",
    stack: ["React", "Spring Boot", "MySQL"],
    img: "/projects/vendor-portal.jpg",
    link: "#",
  },
];

function useDarkMode() {
    const [theme, setTheme] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e) => setTheme(e.matches ? 'dark' : 'light');
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    return { theme, setTheme };
}

function Preloader({ done }) {
    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] grid place-items-center bg-white dark:bg-neutral-950"
                >
                    <div className="flex flex-col items-center gap-6">
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: [0.9, 1.05, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
                            className="text-3xl md:text-5xl font-bold tracking-tight"
                        >
                            RUTWIJ
                        </motion.div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: ["0%", "70%", "100%"] }}
                            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
                            className="h-1 rounded-full bg-neutral-900 dark:bg-neutral-100 w-40 overflow-hidden"
                        />
                        <div className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                            Loading your experience…
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}


const Section = React.forwardRef(({ id, className = "", children }, ref) => (
    <section id={id} ref={ref} className={`min-h-[100dvh] w-full snap-start ${className}`}>
        {children}
    </section>
));

export default function App() {
    const { theme, setTheme } = useDarkMode();
    const [loaded, setLoaded] = useState(false);
    const heroRef = useRef(null);
    const aboutRef = useRef(null);
    const workRef = useRef(null);
    const contactRef = useRef(null);
    const horizontalRef = useRef(null);
    const orbContainerRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1400);
        return () => clearTimeout(timer);
    }, []);

    // Animate GooeyOrb with scroll
    useEffect(() => {
        // if (orbContainerRef.current) {
        //     gsap.to(orbContainerRef.current, {
        //         scrollTrigger: {
        //             trigger: document.body,
        //             start: "top top",
        //             end: "bottom bottom",
        //             scrub: true,
        //         },
        //         y: 200,
        //         scale: 1.5,
        //         rotate: 360,
        //         ease: "power1.inOut",
        //     });
        // }
    }, []);

    // Horizontal scroll setup
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (horizontalRef.current) {
                const track = horizontalRef.current.querySelector("[data-track]");
                const cards = horizontalRef.current.querySelectorAll("[data-card]");
                const totalWidth = cards.length * 360;
                gsap.to(track, {
                    x: () => -(totalWidth - window.innerWidth + 128),
                    ease: "none",
                    scrollTrigger: {
                        trigger: horizontalRef.current,
                        start: "top top",
                        end: () => `+=${Math.max(1000, totalWidth)}`,
                        pin: true,
                        scrub: true,
                    },
                });
            }
        });
        return () => ctx.revert();
    }, []);

    const scrollTo = (ref) => {
        ref?.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sections = useMemo(() => [
        { id: "hero", label: "Home", ref: heroRef },
        { id: "about", label: "About", ref: aboutRef },
        { id: "work", label: "Work", ref: workRef },
        { id: "contact", label: "Contact", ref: contactRef },
    ], []);

    return (
        <div className="min-h-screen w-full text-neutral-900 dark:text-neutral-50 overflow-x-hidden snap-y snap-mandatory">
            <Preloader done={loaded} />

            <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/60 dark:bg-neutral-950/50 border-b border-neutral-200/60 dark:border-neutral-800">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <button onClick={() => scrollTo(heroRef)} className="text-lg md:text-xl font-bold tracking-tight hover:opacity-80">RUTWIJ</button>
                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        {sections.map((s) => (
                            <button key={s.id} onClick={() => scrollTo(s.ref)} className="hover:opacity-80">{s.label}</button>
                        ))}
                    </nav>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="px-3 py-1.5 rounded-2xl border border-neutral-300 dark:border-neutral-700 text-xs">
                            {theme === 'dark' ? 'Light' : 'Dark'}
                        </button>
                    </div>
                </div>
            </header>

            <aside className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
                {sections.map((s) => (
                    <button key={s.id} onClick={() => scrollTo(s.ref)} className="w-2.5 h-10 rounded-full bg-neutral-300 dark:bg-neutral-700 hover:h-14 transition-all" title={s.label} />
                ))}
            </aside>

            {/* Persistent GooeyOrb */}
            <div ref={orbContainerRef} className="fixed inset-0 -z-10 flex items-center justify-center pointer-events-none">
                <GooeyOrb theme={theme} />
            </div>

            {/* Sections */}
            <Section id="hero" ref={heroRef} className="relative grid place-items-center">
                <div className="text-center max-w-xl">
                    <h1 className="text-4xl font-bold mb-4">Full-Stack Developer Crafting Alive Interfaces</h1>
                    <p className="mb-6">5+ years building high-impact admin dashboards, e-commerce & SaaS apps. I obsess over fluid motion, crisp UX and scalable backends.</p>
                    <button onClick={() => scrollTo(workRef)} className="px-4 py-2 border rounded-full">View Work</button>
                </div>
            </Section>

            <Section id="about" ref={aboutRef} className="flex items-center justify-center">
                <h2 className="text-3xl font-bold">About Me</h2>
            </Section>

            <Section id="work" ref={workRef} className="bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                <h2 className="text-3xl font-bold">My Work</h2>
            </Section>

            <Section id="contact" ref={contactRef} className="flex items-center justify-center">
                <h2 className="text-3xl font-bold">Contact</h2>
            </Section>
        </div>
    );
}
