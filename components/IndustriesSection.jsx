const industries = [
    { abbr: "FS", name: "Financial Services" },
    { abbr: "HC", name: "Healthcare" },
    { abbr: "SaaS", name: "Software" },
    { abbr: "GV", name: "Government" },
    { abbr: "MF", name: "Manufacturing" },
    { abbr: "OP", name: "Operations" },
];

export default function IndustriesSection() {
    return (
        <section className="py-32 bg-black">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-16 text-center">
                    Vertical Expertise
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {industries.map((industry) => (
                        <div
                            key={industry.abbr}
                            className="flex flex-col items-center group cursor-default"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center mb-4 group-hover:border-teal-500/50 transition-colors">
                                <span className="text-gray-400 group-hover:text-teal-400">
                                    {industry.abbr}
                                </span>
                            </div>
                            <span className="text-xs uppercase tracking-tighter font-semibold text-gray-500">
                                {industry.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
