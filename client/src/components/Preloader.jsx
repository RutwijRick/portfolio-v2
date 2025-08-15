import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ done }) => {
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

export default Preloader