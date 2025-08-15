import React from 'react'

const Aside = ({ sections, scrollTo }) => {
    return (
        <aside className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
            {sections.map((s) => (
                <button
                    key={s.id}
                    onClick={() => scrollTo(s.ref)}
                    className="w-2.5 h-10 rounded-full bg-neutral-300 dark:bg-neutral-700 hover:h-14 transition-all"
                    title={s.label}
                />
            ))}
        </aside>
    )
}

export default Aside