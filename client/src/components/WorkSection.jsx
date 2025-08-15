import { motion } from "framer-motion";
import { projects } from "../data/Projects";
import { useState } from "react";

const WorkSection = () => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [hoveredProject, setHoveredProject] = useState(null);

    return (
        <>
            {popupVisible && hoveredProject && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-8 left-0 w-[400px] p-4 rounded-2xl shadow-xl backdrop-blur-md bg-white/20 dark:bg-black/30 border border-white/10"
                >
                    <h3 className="text-lg font-semibold mb-2">{hoveredProject.title}</h3>
                    <p className="text-sm mb-4">{hoveredProject.summary}</p>

                    {/* Grid of preview images */}
                    <div className="grid grid-cols-3 gap-2">
                        {hoveredProject.gallery?.slice(0, 3).map((img, idx) => (
                            <motion.img
                                key={idx}
                                src={img}
                                alt={`${hoveredProject.title} preview ${idx + 1}`}
                                className="rounded-lg object-cover w-full h-[80px]"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
            <div className="sticky top-0 h-[100dvh] overflow-hidden">
                <div
                    data-track
                    className="absolute left-16 top-1/2 -translate-y-1/2 flex gap-8 pr-32"
                    style={{ willChange: "transform" }}
                >
                    {projects.map((p) => (
                        <motion.a
                            data-card
                            key={p.id}
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.6 }}
                            className="w-[320px] shrink-0"
                            onMouseEnter={() => {
                                setHoveredProject(p);
                                setPopupVisible(true);
                            }}
                            onMouseLeave={() => {
                                setHoveredProject(null);
                                setPopupVisible(false);
                            }}
                        >
                            <div className="rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur shadow-lg project-list">
                                <div className="aspect-[16/10] overflow-hidden">
                                    <img
                                        src={p.img}
                                        alt={p.title}
                                        className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                                        loading="eager"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="text-lg font-semibold">{p.title}</div>
                                    <div className="text-xs opacity-70 mt-1">{p.summary}</div>
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {p.stack.map((s) => (
                                            <span key={s} className="text-[10px] px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </>
    )
}

export default WorkSection