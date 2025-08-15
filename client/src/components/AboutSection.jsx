import { motion } from "framer-motion";

const AboutSection = () => {
    return (
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold mb-8"
            >
                About
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6 md:gap-10">
                {["UX‑first", "Performance", "Scalability"].map((k) => (
                    <motion.div
                        key={k}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur"
                    >
                        <div className="text-lg font-semibold mb-2">{k}</div>
                        <p className="text-sm opacity-80">
                            {k === "UX‑first" && "Micro‑interactions, scroll choreography, and accessible design."}
                            {k === "Performance" && "Image optimization, lazy loading, code splitting, WebGL budgets."}
                            {k === "Scalability" && "Clean APIs, queues, caching, observability, and CI/CD."}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default AboutSection