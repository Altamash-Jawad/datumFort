import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20">
                    <div>
                        <Link
                            href="#"
                            className="text-2xl font-bold tracking-tighter mb-6 block"
                        >
                            DATA <span className="text-teal-400">KURATOR</span>
                        </Link>
                        <p className="text-gray-500 max-w-sm mb-8">
                            Empowering the world&apos;s most critical enterprises with
                            simplified data architectures and trustworthy AI.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social Placeholder Icons */}
                            <Link
                                href="#"
                                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-teal-500 transition-colors"
                            >
                                <span className="sr-only">Twitter</span>
                                <div className="w-3 h-3 bg-white"></div>
                            </Link>
                            <Link
                                href="#"
                                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-teal-500 transition-colors"
                            >
                                <span className="sr-only">LinkedIn</span>
                                <div className="w-3 h-3 bg-white"></div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="pt-10 border-t border-white/5 text-center text-xs text-gray-600">
                    © 2025 Data Kurator. All rights reserved. Built for global enterprise.
                </div>
            </div>
        </footer>
    );
}
