import { NavLink } from "react-router-dom";
import { STATS_MENU } from "./statsMenu.ts";


export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <div className="relative flex items-center p-3">
                {/* Brand — absolutely positioned so it never competes with
                    the nav's own flex sizing, keeping the nav truly page-centered */}
                <NavLink to="/" className="absolute left-4 flex items-center gap-2 sm:left-6">
                    <img
                        src="/photos/mbappe-vs-haaland-logo.png"
                        alt="Mbappé vs Haaland"
                        className="h-14 w-32 object-cover"
                    />
                </NavLink>

                <nav className="flex justify-center gap-2 w-full">
                    {STATS_MENU.map(menu => (
                        <div key={menu.title} className="relative group">
                            <button
                                className="
                                    flex items-center gap-1.5 rounded-md px-4 py-2.5 font-semibold text-gray-700
                                    transition-colors duration-150 hover:bg-emerald-50 hover:text-emerald-700
                                    group-focus-within:bg-emerald-50 group-focus-within:text-emerald-700
                                "
                            >
                                {menu.title}
                                {menu.items.length > 0 &&
                                    <svg
                                        className="
                                            h-3.5 w-3.5 text-gray-400
                                            transition-transform duration-200
                                            group-hover:rotate-180 group-hover:text-emerald-600
                                            group-focus-within:rotate-180 group-focus-within:text-emerald-600
                                        "
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25
                                                   4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                }
                            </button>

                            <div
                                className="
                                    absolute top-full left-1/2 -translate-x-1/2
                                    w-56 pt-2 invisible opacity-0 -translate-y-1
                                    group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                                    group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0
                                    transition-all duration-200 ease-out
                                "
                            >
                                {menu.items.length > 0 &&
                                    <div className="rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg shadow-gray-900/5 ring-1 ring-gray-900/5">
                                        {menu.items.map(item => (
                                            <NavLink
                                                key={item.path}
                                                to={item.path}
                                                className={({ isActive }) =>
                                                    `block rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors duration-150 ${
                                                        isActive
                                                            ? "bg-emerald-50 text-emerald-700"
                                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                    }`
                                                }
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </nav>
            </div>
        </header>
    );
}