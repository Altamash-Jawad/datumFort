import Link from "next/link";
import Reveal from "./Reveal";

export default function FinalCta() {
    return (
        <section className="py-32 bg-base">
            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="relative overflow-hidden rounded-3xl border border-edge bg-surface px-8 py-16 sm:px-16 sm:py-20 text-center">
                        <div className="aurora" aria-hidden="true"></div>
                        <div className="relative z-10 mx-auto max-w-2xl">
                            <h2 className="text-3xl sm:text-5xl font-semibold mb-6 tracking-tight text-t1">
                                Ready to put AI to work?
                            </h2>
                            <p className="text-lg text-t2 mb-10">
                                Book a free 30-minute discovery call. Walk away with a prioritized
                                opportunity map — no cost, no commitment.
                            </p>
                            <Link
                                href="#contact"
                                className="btn-accent inline-flex items-center gap-3 font-semibold px-8 py-4 rounded-full"
                            >
                                Schedule your discovery call
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path clipRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" fillRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
