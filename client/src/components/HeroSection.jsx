import { motion } from "framer-motion";

const HeroSection = ({ scrollTo, workRef, contactRef}) => {
    return (
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9 }}
                className="space-y-5"
            >
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                    Full‑Stack Developer
                    <br />
                    <span className="opacity-80">Crafting Alive Interfaces</span>
                </h1>
                <p className="text-neutral-600 dark:text-neutral-300 max-w-prose">
                    5+ years building high‑impact admin dashboards, e‑commerce & SaaS apps. I obsess over
                    fluid motion, crisp UX and scalable backends.
                </p>
                <div className="flex gap-3">
                    <button onClick={() => scrollTo(workRef)} className="px-4 py-2 rounded-2xl border border-neutral-300 dark:border-neutral-700">
                        View Work
                    </button>
                    <button onClick={() => scrollTo(contactRef)} className="px-4 py-2 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                        Contact
                    </button>
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 1.5 }}
                className="md:justify-self-end"
            >
                <div className="p-6 rounded-3xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur border border-neutral-200 dark:border-neutral-800 shadow-xl">
                    <div className="text-sm uppercase tracking-wider mb-2 opacity-70">Expertise</div>
                    <div className="text-2xl font-semibold">Building delightful dashboards</div>
                    <div className="mt-3 text-sm opacity-70">React · Angular · NodeJS · NextJS · NestJS</div>
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 2 }}
                className="md:justify-self-end"
            >
                <div className="p-6 rounded-3xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur border border-neutral-200 dark:border-neutral-800 shadow-xl">
                    <div className="text-sm uppercase tracking-wider mb-2 opacity-70">Databases</div>
                    <div className="text-2xl font-semibold">Relational, Graphical, Distributed & NoSQL</div>
                    <div className="mt-3 text-sm opacity-70">MySQL · PostgreSQL · MongoDB · Kafka · CouchDB </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 2.5 }}
                className="md:justify-self-end"
            >
                <div className="p-6 rounded-3xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur border border-neutral-200 dark:border-neutral-800 shadow-xl">
                    <div className="text-sm uppercase tracking-wider mb-2 opacity-70">Cloud</div>
                    <div className="text-2xl font-semibold">Containerization & Orchestration</div>
                    <div className="mt-3 text-sm opacity-70">AWS · Jenkins · Docker · Kubernetes · CI/CD</div>
                </div>
            </motion.div>
        </div>
    )
}

export default HeroSection