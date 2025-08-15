import React from "react";

// ---- Section Component (for pinning & snap) -------------------------------------------------
const Section = React.forwardRef(({ id, className = "", children }, ref) => (
    <section id={id} ref={ref} className={`min-h-[100dvh] w-full snap-start ${className} relative`} style={{ zIndex: '5' }}>
        {children}
    </section>
));

export default Section;