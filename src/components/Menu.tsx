import { useState } from "react";
import { NavLink } from "react-router-dom";
import { STATS_MENU } from "../utils/statsMenu";


export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    function toggleMenu() {
        if (isOpen) {
            setExpandedSection(null);
        }
        setIsOpen(!isOpen);
    }

    function toggleSection(title: string) {
        setExpandedSection(current => current === title ? null : title);
    }

    function closeMenu() {
        setIsOpen(false);
        setExpandedSection(null);
    }

    return (
        <>
            {/* Hamburger button */}
            <button onClick={toggleMenu} aria-label="Open menu"
                className="relative right-4 top-3 z-[70] flex h-12 w-12 items-center justify-center rounded-md transition hover:bg-neutral-800"
            >
                <div className="relative h-8 w-9">
                    <span className={`absolute left-0 top-0 h-1 w-full bg-white transition-all duration-300
                            ${isOpen ? "translate-y-[14px] rotate-45" : ""}`}
                    />
                    <span className={`absolute left-0 top-[13.5px] h-1 w-full bg-white transition-all duration-300
                            ${isOpen ? "opacity-0" : ""}`}
                    />
                    <span className={`absolute left-0 bottom-0 h-1 w-full bg-white transition-all duration-300
                            ${isOpen ? "-translate-y-[14px] -rotate-45" : ""}`}
                    />
                </div>
            </button>

            {/* Overlay */}
            <div onClick={closeMenu} className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300
                    ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
            />

            {/* Slide panel */}
            ${isOpen ?
                <aside className={`fixed right-0 top-0 z-50 h-screen w-80 max-w-[90vw] overflow-y-auto border-l 
                    border-neutral-800 bg-black transition-transform duration-300
                        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                    <div className="pt-20 pb-8">
                        {STATS_MENU.map(menu => {
                            const expanded = expandedSection === menu.title;

                            return (
                                <div key={menu.title} className="border-b border-neutral-800">
                                    <button onClick={() => toggleSection(menu.title)}
                                        className="flex w-full items-center justify-between px-6 py-4
                                            text-left font-semibold text-white transition hover:bg-neutral-900"
                                    >
                                        <span>{menu.title}</span>

                                        {menu.items.length > 0 && (
                                            <svg className={`h-4 w-4 transition-transformduration-300
                                                    ${expanded ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor"
                                            >
                                                <path fillRule="evenodd"
                                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0
                                                    111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-300
                                            ${expanded ? "max-h-96" : "max-h-0 max-w-0"}`}
                                    >
                                        {menu.items.map(item => (
                                            <NavLink key={item.path} to={item.path} onClick={closeMenu}
                                                className={({ isActive }) =>
                                                    `block pl-10 pr-6 py-3 text-sm transition
                                                    ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`}
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </aside>
            : ""}
        </>
    );
}