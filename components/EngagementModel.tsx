import { steps } from "../constants";
import Reveal from "./Reveal";

export default function EngagementModel() {
    return (
        <section
            id="how-we-work"
            className="py-32 bg-surface border-y border-edge scroll-mt-24"
        >
            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-20 max-w-2xl mx-auto">
                        <span className="text-xs font-medium uppercase tracking-[0.15em] text-t3">
                            Our process
                        </span>
                        <h2 className="text-4xl font-semibold mb-4 mt-3 tracking-tight text-t1">
                            How We Work
                        </h2>
                        <p className="text-t2">
                            From first call to a system running in production: a clear path,
                            fixed scope, no surprises.
                        </p>
                    </div>
                </Reveal>

                <ol className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    <div
                        className="hidden md:block absolute top-6 left-0 w-full h-px bg-edge z-0"
                        aria-hidden="true"
                    ></div>
                    {steps.map((step, i) => (
                        <Reveal
                            as="li"
                            key={step.number}
                            delay={i * 100}
                            className="relative z-10 flex flex-col list-none"
                        >
                            <div className="w-12 h-12 rounded-full bg-violet flex items-center justify-center text-white font-semibold mb-6 ring-8 ring-surface tabular-nums">
                                {step.number}
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-t1">{step.title}</h3>
                            <p className="text-sm text-t2 mb-4 flex-grow leading-relaxed">
                                {step.description}
                            </p>
                            <p className="text-sm text-t2 border-l border-violet pl-3">
                                {step.deliverable}
                            </p>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </section>
    );
}
