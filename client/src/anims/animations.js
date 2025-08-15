export const fadeUp = {
    hidden: { y: 40, opacity: 0 },
    visible: (delay = 0) => ({
        y: 0,
        opacity: 1,
        transition: { delay, duration: 0.8, ease: "easeOut" }
    })
};

export const slideRight = {
    hidden: { x: -60, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 1, ease: "easeOut" }
    }
};