import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="hero-bg min-h-screen flex items-center relative pt-20">
            <div className="glow-shape"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="max-w-4xl">
                    <h1 className="headline-xl font-extrabold mb-8">
                        ENTERPRISE DATA,
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                            SIMPLIFIED.
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
                        <b>
                            We help organizations accelerate AI adoption by building MVPs,
                            PoCs, production-grade AI systems, and scalable data pipelines
                            that drive measurable business value.
                        </b>
                    </p>
                    {/* Hero CTA */}
                    <Link
                        href="#contact"
                        className="inline-flex items-center bg-white text-black pl-8 pr-2 py-2 rounded-full font-bold group hover:bg-teal-400 transition-all duration-300"
                    >
                        <span>Schedule Consultation</span>
                        <span className="ml-4 w-10 h-10 rounded-full bg-black flex items-center justify-center group-hover:bg-black/80 transition-colors">
                            <svg
                                className="h-5 w-5 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clipRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    fillRule="evenodd"
                                />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
