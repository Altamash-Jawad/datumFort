import { industries } from "../constants";
import Reveal from "./Reveal";

export default function IndustriesSection() {
    return (
        <section id="industries" className="py-32 bg-base scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <h2 className="text-3xl font-semibold mb-4 text-center tracking-tight text-t1">
                        Vertical Expertise
                    </h2>
                    <p className="text-t2 text-center mb-16 max-w-xl mx-auto">
                        Deep domain experience across the industries where data and AI move
                        the needle most.
                    </p>
                </Reveal>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {industries.map((industry, i) => (
                        <Reveal
                            key={industry.abbr}
                            delay={(i % 6) * 60}
                            className="flex flex-col items-center group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-surface border border-edge flex items-center justify-center mb-4 transition-colors duration-200 group-hover:border-edge-hover">
                                <span className="font-semibold text-t3 transition-colors group-hover:text-violet">
                                    {industry.abbr}
                                </span>
                            </div>
                            <span className="text-xs uppercase tracking-tight font-medium text-t3 text-center">
                                {industry.name}
                            </span>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
