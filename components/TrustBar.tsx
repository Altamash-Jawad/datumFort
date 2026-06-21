import { industries } from "../constants";
import Reveal from "./Reveal";

export default function TrustBar() {
    return (
        <section className="bg-surface border-y border-edge py-10">
            <div className="max-w-7xl mx-auto px-6">
                <Reveal>
                    <p className="text-center text-xs font-medium uppercase tracking-[0.15em] text-t3 mb-6">
                        Built for regulated, data-intensive industries
                    </p>
                    <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
                        {industries.map((industry) => (
                            <li
                                key={industry.name}
                                className="text-sm font-medium tracking-wide text-t2"
                            >
                                {industry.name}
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </section>
    );
}
