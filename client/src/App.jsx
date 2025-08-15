import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
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
import FloatingParticles from "./components/FloatingParticles";
import Preloader from "./components/Preloader";
import techStacks from "./data/techStacks";
// Optional smooth scrolling (Apple-like feel)
// import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

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

      const baseHue = 198; // blue hue for #7dd3fc
      const baseSat = 94;  // saturation for #7dd3fc

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

        // Lightness oscillates between 40% (dark) and 75% (light) as you scroll
        const lightness = 40 + Math.sin(scrollY / 300) * 15 + 20;

        const color1 = new THREE.Color(`hsl(${baseHue}, ${baseSat}%, ${lightness}%)`);
        const color2 = new THREE.Color(`hsl(${baseHue}, ${baseSat - 10}%, ${lightness - 5}%)`);
        // Mix colors slightly for a subtle gradient shift
        const mixedColor = color1.clone().lerp(color2, 0.5);

        gsap.to(materialRef.current.color, {
          r: mixedColor.r,
          g: mixedColor.g,
          b: mixedColor.b,
          duration: 0.6,
        });
      }
      document.body.style.background = theme === 'dark'
        ? `linear-gradient(180deg, #000 ${scrollY / 85}%, #4a004a`
        : `linear-gradient(180deg, #fff ${scrollY / 85}%, #ccc)`;
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



      // === ABOUT SECTION ===
      // if (aboutRef.current) {
      //   const totalStages = techStacks.length + 1; // intro + stacks
      //   const stageHeight = window.innerHeight * 0.9; // slightly shorter per stage for snappier feel
      //   const totalScroll = totalStages * stageHeight + window.innerHeight * 0.5; // buffer

      //   const aboutTl = gsap.timeline({
      //     scrollTrigger: {
      //       trigger: aboutRef.current,
      //       start: "top top",
      //       end: `+=${totalScroll}`,
      //       pin: true,
      //       scrub: true,
      //       anticipatePin: 1,
      //     }
      //   });

      //   // Step 1: About Me intro
      //   aboutTl.fromTo(
      //     aboutRef.current.querySelector("[data-about-intro]"),
      //     { opacity: 0, y: 40 },
      //     { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      //   );

      //   // Step 2..N: Each tech stack reveal
      //   techStacks.forEach((stack, i) => {
      //     aboutTl.fromTo(
      //       aboutRef.current.querySelector(`[data-stack='${i}']`),
      //       { opacity: 0, y: 60 },
      //       { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      //       "+=0.5" // delay between stacks
      //     );
      //   });
      // }

      // Horizontal scroll section (projects strip)
      // if (horizontalRef.current) {
      //   const track = horizontalRef.current.querySelector("[data-track]");
      //   const cards = horizontalRef.current.querySelectorAll("[data-card]");
      //   const totalWidth = cards.length * 360; // card width estimate
      //   gsap.to(track, {
      //     x: () => -(totalWidth - window.innerWidth + 128),
      //     ease: "none",
      //     scrollTrigger: {
      //       trigger: horizontalRef.current,
      //       start: "top top",
      //       end: () => `+=${Math.max(1000, totalWidth)}`,
      //       pin: true,
      //       scrub: true,
      //       invalidateOnRefresh: true,
      //     },
      //   });
      // }
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

  useEffect(() => {
    let isTeleporting = false;
    let tensionActive = false;

    const doc = document.documentElement; // more reliable than body
    const maxY = () => doc.scrollHeight - window.innerHeight;
    const atTop = () => window.scrollY <= 0;
    const atBottom = () => Math.ceil(window.scrollY + window.innerHeight) >= doc.scrollHeight;

    const jumpTo = (y) => {
      isTeleporting = true;
      // jump just inside the page to avoid immediate re-trigger
      window.scrollTo({ top: y, behavior: "auto" });
      // release the guard after the browser applies the jump
      requestAnimationFrame(() => { isTeleporting = false; });
    };

    // Adds tension before teleport
    const applyTension = (direction) => {
      if (tensionActive) return;
      tensionActive = true;

      const tensionDistance = direction === "up" ? -80 : 80; // px overshoot
      const target = window.scrollY + tensionDistance;

      gsap.to(window, {
        scrollTo: { top: target },
        duration: 0.25,
        ease: "power2.out",
        onComplete: () => {
          if (direction === "up") jumpTo(maxY() - 1); // top → end
          else jumpTo(1); // bottom → start
          tensionActive = false;
        },
      });
    };

    // Safety net: keeps loop working if user drags scrollbar or momentum ends exactly at boundary
    const onScroll = (e) => {
      if (isTeleporting) return;
      if (e.deltaY < 0 && atTop()) {
        applyTension("up");
      } else if (e.deltaY > 0 && atBottom()) {
        applyTension("down");
      }
    };

    // Direction-aware wheel handler (desktop)
    const onWheel = (e) => {
      if (isTeleporting || tensionActive) return;
      if (e.deltaY < 0 && atTop()) {
        applyTension("up");
      } else if (e.deltaY > 0 && atBottom()) {
        applyTension("down");
      }
    };

    // Direction-aware touch handler (mobile)
    let lastY = 0;
    const onTouchStart = (e) => { lastY = e.touches[0].clientY; };
    const onTouchMove = (e) => {
      if (isTeleporting || tensionActive) return;
      const currentY = e.touches[0].clientY;
      const dy = lastY - currentY; // >0 means scrolling down, <0 up
      if (dy < 0 && atTop()) jumpTo(maxY() - 1);         // swipe down at top → end
      else if (dy > 0 && atBottom()) jumpTo(1);          // swipe up at bottom → start
      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);


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
          {/* <Suspense fallback={null}> */}
          <FloatingParticles />
          {/* </Suspense> */}
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
        <HeroSection scrollTo={scrollTo} workRef={workRef} contactRef={contactRef} loaded={loaded} />
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
