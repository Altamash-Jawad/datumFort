import { pillars } from "../constants";
import Reveal from "./Reveal";

export default function ResponsibleAI() {
    return (
        <section id="responsible-ai" className="py-32 bg-surface border-y border-edge scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="bg-base border border-edge rounded-3xl p-12 md:p-20 relative overflow-hidden">
                        <div
                            className="absolute -top-8 -right-8 p-8 text-sky/50"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-12 rounded-full bg-sky/15 blur-3xl" />
                            <svg
                                className="relative h-52 w-52 md:h-72 md:w-72 drop-shadow-[0_0_18px_color-mix(in_oklab,var(--color-sky)_28%,transparent)]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="0.8"
                                />
                            </svg>
                        </div>
                        <div className="relative z-10 max-w-3xl">
                            <span className="text-xs font-medium uppercase tracking-[0.15em] text-t3">
                                Trust by design
                            </span>
                            <h2 className="text-4xl font-semibold mb-8 mt-3 tracking-tight text-t1">
                                Responsible AI at Our Core.
                            </h2>
                            <div className="space-y-6 text-lg text-t2">
                                <p>
                                    We believe enterprise intelligence is only as strong as its
                                    ethical foundation. Our proprietary{" "}
                                    <strong className="text-t1 font-semibold">Ethos Framework</strong>{" "}
                                    ensures every model we deploy is rigorous in bias mitigation and
                                    built with security-first architectures.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium uppercase tracking-widest text-t2">
                                    {pillars.map((pillar) => (
                                        <li key={pillar} className="flex items-center">
                                            <span
                                                className="w-2 h-2 bg-violet rounded-full mr-3 shrink-0"
                                                aria-hidden="true"
                                            ></span>
                                            {pillar}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
