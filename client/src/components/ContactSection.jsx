import { motion } from "framer-motion";

const ContactSection = () => {
    return (
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-28 text-center">
            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold mb-6"
            >
                Let’s build something fluid.
            </motion.h2>
            <p className="opacity-80 max-w-prose mx-auto">
                I’m open to roles and freelance projects. Dashboards, e‑commerce, SaaS — from UX to
                infra.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
                <a
                    href="mailto:hello@yourdomain.dev"
                    className="px-5 py-2 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                >
                    Email Me
                </a>
                <a
                    href="/Rutwij-Resume.pdf"
                    className="px-5 py-2 rounded-2xl border border-neutral-300 dark:border-neutral-700"
                >
                    Download Résumé
                </a>
            </div>
        </div>
    )
}

export default ContactSection