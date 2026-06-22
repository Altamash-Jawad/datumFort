import { services } from "../constants";
import Reveal from "./Reveal";

// Per-card accent: glow class + soft tinted tile behind the emoji, cycled for rhythm.
const accents = [
    { glow: "", pipBg: "oklch(0.94 0.04 262)" },
    { glow: "glow-amber", pipBg: "oklch(0.94 0.05 75)" },
    { glow: "glow-sky", pipBg: "oklch(0.94 0.04 158)" },
];

export default function ServicesSection() {
    return (
        <section id="services" className="py-32 bg-base scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <div className="mb-16 max-w-2xl">
                        <span className="text-xs font-medium uppercase tracking-[0.15em] text-t3">
                            What we do
                        </span>
                        <h2 className="text-4xl font-semibold mb-4 mt-3 tracking-tight text-t1">
                            Bridge your organization with AI
                        </h2>
                        <p className="text-t2 leading-relaxed">
                            From first prototype to governed production systems, with capabilities
                            that turn your data into measurable outcomes.
                        </p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service, i) => {
                        const a = accents[i % accents.length];
                        return (
                            <Reveal
                                as="article"
                                key={service.title}
                                delay={(i % 3) * 70}
                                className={`card ${a.glow} h-full p-7`}
                            >
                                <div
                                    className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-[10px] text-2xl leading-none"
                                    style={{ background: a.pipBg }}
                                    aria-hidden="true"
                                >
                                    {service.icon}
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-t1">{service.title}</h3>
                                <p className="text-t2 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
