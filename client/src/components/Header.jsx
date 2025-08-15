import React from 'react'
import { Sun } from 'react-feather';


const Header = ({ sections, heroRef, scrollTo }) => {

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/60 dark:bg-neutral-950/50 border-b border-neutral-200/60 dark:border-neutral-800">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* <button
                    onClick={() => scrollTo(heroRef)}
                    className="text-lg md:text-xl font-bold tracking-tight hover:opacity-80"
                >
                </button> */}
                    <img className='pt-2' src="./signature.png" alt="Rutwij Vaykode" style={{maxWidth: '15%'}} />
                <nav className="hidden md:flex items-center gap-6 text-sm">
                    {sections.map((s) => (
                        <button key={s.id} onClick={() => scrollTo(s.ref)} className="hover:opacity-80">
                            {s.label}
                        </button>
                    ))}
                </nav>
                <div className="flex items-center gap-3">
                    <Sun />
                </div>
            </div>
        </header>
    )
}

export default Header