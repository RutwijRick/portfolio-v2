import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './index.css'
import GooeyOrb from "./components/GooeyOrb";
import Section from './components/Section'
import Header from "./components/Header";
import Aside from "./components/Aside";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import WorkSection from "./components/WorkSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import BlobsBG from "./components/BlobsBG";
// Optional smooth scrolling (Apple-like feel)
// import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// Simple Particles Component
function FloatingParticles() {
  const points = useRef();
  const [positions] = useState(() => {
    const arr = new Float32Array(5000);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - 0.5) * 20;
    return arr;
  });

  useFrame(({ clock }) => points.current.rotation.y = clock.elapsedTime * 0.02);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
}

// ---- Utilities -------------------------------------------------------------------------------
function useDarkMode() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  return { dark, setDark };
}

// Optional: enable ultra-smooth scrolling
// function useLenis() {
//   useEffect(() => {
//     const lenis = new Lenis({ lerp: 0.1, smooth: true });
//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);
//     return () => lenis.destroy();
//   }, []);
// }

// ---- Preloader -------------------------------------------------------------------------------
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

// ---- Main App -------------------------------------------------------------------------------
export default function App() {
  const orbRef = useRef();
  const [theme, setTheme] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const { dark, setDark } = useDarkMode();
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);
  const horizontalRef = useRef(null);
  // useLenis(); // uncomment if using Lenis

  // Gooey ORB Effects
  const gooeyOrbRef = useRef();
  const materialRef = useRef();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.body.style.background = theme === 'dark'
      ? `linear-gradient(180deg, #000 ${85}%, rgb(195, 20, 50))`
      : `linear-gradient(180deg, #fff ${85}%, #ccc)`;
  }, [theme]);

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      setTheme(e.matches ? 'dark' : 'light');
    });

    const scrollHandler = () => {
      const scrollY = window.scrollY;
      const scale = (1 + scrollY / 1800) / 2;
      const position = [Math.sin(scrollY / 200) * 2, Math.cos(scrollY / 200) * 2, 0];
      const shapeMorph = Math.sin(scrollY / 100) * 0.5;
      const distortion = 0.45;

      if (gooeyOrbRef.current) {
        if (scrollY >= 150) {
          gsap.to(gooeyOrbRef.current.scale, { x: scale, y: scale, z: scale, duration: 0.5 });
          gsap.to(gooeyOrbRef.current.position, { x: position[0], y: position[1], z: position[2], duration: 0.5 });
          gsap.to(gooeyOrbRef.current.geometry.parameters, { radius: 1 + shapeMorph, duration: 0.5 });
        } else {
          gsap.to(gooeyOrbRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.5 });
          gsap.to(gooeyOrbRef.current.position, { x: 0, y: 0, z: 0, duration: 0.5 });
          gsap.to(gooeyOrbRef.current.geometry.parameters, { radius: 1, duration: 0.5 });
        }
        materialRef.current.distort = distortion;
        // Animate gradient color based on scroll
        const hueShift = (scrollY / 5) % 360;
        const color1 = new THREE.Color(`hsl(${hueShift}, 90%, 60%)`);
        const color2 = new THREE.Color(`hsl(${(hueShift + 60) % 360}, 90%, 60%)`);

        // Mix the two colors into one for the material
        const mixedColor = color1.clone().lerp(color2, 0.5);
        gsap.to(materialRef.current.color, {
          r: mixedColor.r,
          g: mixedColor.g,
          b: mixedColor.b,
          duration: 0.6,
        });
      }
      document.body.style.background = theme === 'dark'
        ? `linear-gradient(180deg, #000 ${scrollY / 85}%, rgb(195, 20, 50))`
        : `linear-gradient(180deg, #fff ${scrollY / 85}%, #ccc)`;
      // linear-gradient(to right, rgb(195, 20, 50), rgb(36, 11, 54))
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [theme]);

  // Fake asset loading: swap with actual image preloaders
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  // GSAP: Intro text + pin hero
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the hero section for a nice intro sequence
      if (heroRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          anticipatePin: 1,
          scrub: true,
        });
      }

      // Horizontal scroll section (projects strip)
      if (horizontalRef.current) {
        const track = horizontalRef.current.querySelector("[data-track]");
        const cards = horizontalRef.current.querySelectorAll("[data-card]");
        const totalWidth = cards.length * 360; // card width estimate
        gsap.to(track, {
          x: () => -(totalWidth - window.innerWidth + 128),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: "top top",
            end: () => `+=${Math.max(1000, totalWidth)}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const sections = useMemo(
    () => [
      { id: "hero", label: "Home", ref: heroRef },
      { id: "about", label: "About", ref: aboutRef },
      { id: "work", label: "Work", ref: workRef },
      { id: "contact", label: "Contact", ref: contactRef },
    ],
    []
  );

  const scrollTo = (ref) => {
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="relative min-h-screen w-full text-neutral-900 dark:text-neutral-50 overflow-x-hidden snap-y snap-mandatory" style={{ zIndex: '2' }}>
      <Preloader done={loaded} />

      {/* Top Nav */}
      <Header sections={sections} heroRef={heroRef} scrollTo={scrollTo} />

      {/* Virtual Side Scrollbar */}
      <Aside sections={sections} scrollTo={scrollTo} />

      <div className="fixed w-full h-full">
        {/* <GooeyOrb/> */}
        <Canvas
          camera={{ position: [0, 0, 4], fov: 45 }}
          className="fixed inset-0 pointer-events-none"
        >
          <Suspense fallback={null}>
            <FloatingParticles />
          </Suspense>
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 3, 5]} intensity={1.4} />
          <directionalLight position={[-3, -3, -5]} intensity={0.6} />

          <Float speed={1.2} rotationIntensity={1} floatIntensity={1.5}>
            <Sphere args={[1.2, 128, 128]} ref={gooeyOrbRef}>
              <MeshDistortMaterial
                ref={materialRef}
                roughness={0.15}
                metalness={0.8}
                transparent
                opacity={0.6}
                transmission={0.9}
                thickness={1}
                envMapIntensity={1}
                clearcoat={1}
                clearcoatRoughness={0}
                color={"#7dd3fc"} // starting color

                speed={2}
              />
            </Sphere>
          </Float>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.6}
          />
        </Canvas>
      </div>
      {/* HERO ------------------------------------------------------------------ */}
      <Section id="hero" ref={heroRef} className="relative grid place-items-center">
        <HeroSection scrollTo={scrollTo} workRef={workRef} contactRef={contactRef} />
      </Section>

      {/* ABOUT ----------------------------------------------------------------- */}
      <Section id="about" ref={aboutRef} className="grid place-items-center">
        <AboutSection />
      </Section>

      {/* WORK (HORIZONTAL) ----------------------------------------------------- */}
      <Section id="work" ref={workRef}>
        <div ref={horizontalRef} className="relative h-[100dvh]">
          <WorkSection />
        </div>
      </Section>

      {/* CONTACT ---------------------------------------------------------------- */}
      <Section id="contact" ref={contactRef} className="grid place-items-center">
        <ContactSection />
      </Section>

      {/* FOOTER */}
      <Footer />

      {/* Gradient FX background blobs (subtle, alive) */}
      <BlobsBG />
    </div>
  );
}
