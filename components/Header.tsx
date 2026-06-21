"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#industries" },
    { label: "About Us", href: "#responsible-ai" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 16);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 border-b transition-colors duration-300 ${
                scrolled
                    ? "border-edge bg-base/80 backdrop-blur-md"
                    : "border-transparent bg-base/40 backdrop-blur-sm"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link
                    href="#"
                    className="text-2xl font-semibold tracking-tighter text-t1"
                    aria-label="Data Kurator — home"
                >
                    DATA <span className="text-violet">KURATOR</span>
                </Link>

                <nav
                    className="hidden md:flex items-center space-x-10 text-sm font-medium text-t3"
                    aria-label="Primary"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="relative isolate overflow-hidden rounded-md px-2 py-1 hover:text-t1 transition-colors duration-300 after:pointer-events-none after:absolute after:inset-y-0 after:-left-1/2 after:-z-10 after:w-1/2 after:skew-x-[-20deg] after:bg-gradient-to-r after:from-transparent after:via-violet/25 after:to-transparent after:blur-md after:transition-transform after:duration-700 after:ease-out hover:after:translate-x-[300%]"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <Link
                    href="#contact"
                    className="btn-accent hidden md:inline-flex px-6 py-2.5 rounded-full text-sm font-semibold"
                >
                    Contact
                </Link>

                <button
                    type="button"
                    className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-t2 hover:bg-surface transition-colors"
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    {menuOpen ? (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {menuOpen && (
                <nav
                    id="mobile-menu"
                    aria-label="Mobile"
                    className="md:hidden border-t border-edge bg-base/95 backdrop-blur-md px-6 py-6 space-y-1"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="block py-3 text-base font-medium text-t2 hover:text-violet transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="#contact"
                        onClick={() => setMenuOpen(false)}
                        className="btn-accent mt-4 block text-center px-6 py-3 rounded-full text-sm font-semibold"
                    >
                        Contact
                    </Link>
                </nav>
            )}
        </header>
    );
}
