import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="#" className="text-2xl font-bold tracking-tighter">
                        DATA <span className="text-teal-400">KURATOR</span>
                    </Link>
                </div>
                {/* Navigation Links */}
                <nav className="hidden md:flex items-center space-x-10 text-sm font-medium text-gray-400">
                    <Link href="#services" className="hover:text-white transition-colors">
                        Services
                    </Link>
                    <Link href="#" className="hover:text-white transition-colors">
                        Case Studies
                    </Link>
                    <Link href="#" className="hover:text-white transition-colors">
                        About Us
                    </Link>
                    <Link href="#contact" className="hover:text-white transition-colors">
                        Contact
                    </Link>
                </nav>
                {/* CTA Button */}
                <div>
                    <Link
                        href="#contact"
                        className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-all"
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </header>
    );
}
