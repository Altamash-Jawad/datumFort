import Link from "next/link";
import Reveal from "./Reveal";

const stats = [
    { value: "70%", label: "less manual overhead" },
    { value: "4-week", label: "path to production" },
    { value: "100%", label: "in your own infrastructure" },
];

export default function HeroSection() {
    return (
        <section className="relative bg-base text-t1 min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
            <div className="aurora" aria-hidden="true"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="max-w-3xl">
                    <Reveal>
                        <span className="badge-live inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide mb-10">
                            <span className="badge-dot" aria-hidden="true"></span>
                            Enterprise AI, built to be trusted
                        </span>
                    </Reveal>

                    <Reveal delay={60}>
                        <h1 className="headline-xl mb-8">
                            Enterprise AI,
                            <br />
                            <span className="text-violet">simplified.</span>
                        </h1>
                    </Reveal>

                    <Reveal delay={120}>
                        <p className="text-lg sm:text-xl text-t2 max-w-2xl mb-12 leading-relaxed">
                            We help organizations accelerate AI adoption — turning data into
                            production-grade systems that ship in weeks and drive measurable
                            business value.
                        </p>
                    </Reveal>

                    {/* Primary CTA + quiet secondary link (Hick's Law) */}
                    <Reveal delay={180}>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                            <Link
                                href="#contact"
                                className="btn-accent inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold"
                            >
                                Schedule Consultation
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path clipRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" fillRule="evenodd" />
                                </svg>
                            </Link>
                            <Link
                                href="#how-we-work"
                                className="text-t2 font-medium hover:text-t1 transition-colors underline-offset-4 hover:underline"
                            >
                                or see how we work →
                            </Link>
                        </div>
                    </Reveal>

                    {/* Proof bar */}
                    <Reveal delay={240}>
                        <dl className="mt-20 grid grid-cols-3 gap-6 max-w-2xl border-t border-edge pt-8">
                            {stats.map((stat) => (
                                <div key={stat.label}>
                                    <dt className="sr-only">{stat.label}</dt>
                                    <dd>
                                        <span className="block text-2xl sm:text-3xl font-semibold text-t1 tabular-nums">
                                            {stat.value}
                                        </span>
                                        <span className="text-xs sm:text-sm text-t3">{stat.label}</span>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
