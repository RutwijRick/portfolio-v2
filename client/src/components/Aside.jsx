import React, { useEffect, useState } from "react";

const Aside = ({ sections, scrollTo }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      let current = 0;
      sections.forEach((s, i) => {
        if (window.scrollY >= s.ref.current.offsetTop - window.innerHeight / 2) {
          current = i;
        }
      });
      setActiveIndex(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <aside className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
      {sections.map((s, i) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.ref)}
          className={`w-2.5 rounded-full transition-all ${
            activeIndex === i
              ? "h-14 bg-blue-500 dark:bg-blue-400"
              : "h-10 bg-neutral-300 dark:bg-neutral-700"
          }`}
          title={s.label}
        />
      ))}
    </aside>
  );
};

export default Aside;
