import Link from "next/link";

const footerNav = [
    { label: "Services", href: "#services" },
    { label: "How We Work", href: "#how-we-work" },
    { label: "Vertical Expertise", href: "#industries" },
    { label: "Responsible AI", href: "#responsible-ai" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
];

const socials = [
    {
        label: "Twitter",
        href: "https://twitter.com",
        path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com",
        path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
    },
];

export default function Footer() {
    return (
        <footer className="bg-surface text-t1 border-t border-edge pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Brand */}
                    <div>
                        <Link
                            href="#"
                            className="text-2xl font-bold tracking-tighter mb-6 block"
                            aria-label="Data Kurator — home"
                        >
                            DATA <span className="text-violet">KURATOR</span>
                        </Link>
                        <p className="text-t2 max-w-sm mb-8">
                            Empowering the world&apos;s most critical enterprises with
                            simplified data architectures and trustworthy AI.
                        </p>
                        <div className="flex space-x-4">
                            {socials.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full border border-edge flex items-center justify-center text-t2 hover:border-edge-hover hover:text-violet transition-colors"
                                >
                                    <span className="sr-only">{social.label}</span>
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path d={social.path} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick nav */}
                    <nav aria-label="Footer" className="md:justify-self-end">
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-t3 mb-5">
                            Explore
                        </h2>
                        <ul className="space-y-3">
                            {footerNav.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-t2 hover:text-violet transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="pt-10 border-t border-edge text-center text-xs text-t3">
                    © 2025 Data Kurator. All rights reserved. Built for global enterprise.
                </div>
            </div>
        </footer>
    );
}
