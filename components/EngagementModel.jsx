const steps = [
    {
        number: "01",
        title: "Assess & Strategize",
        description: "Identifying high-impact opportunities and data readiness.",
    },
    {
        number: "02",
        title: "Architect & Prototype",
        description: "Building secure sandbox environments for validation.",
    },
    {
        number: "03",
        title: "Deploy & Integrate",
        description:
            "Seamless production rollout within existing infrastructure.",
    },
    {
        number: "04",
        title: "Govern & Optimize",
        description: "Continuous monitoring for performance and safety.",
    },
];

export default function EngagementModel() {
    return (
        <section className="py-32 bg-zinc-950">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold mb-4">Engagement Model</h2>
                    <p className="text-gray-400">
                        Our structured path to enterprise-wide intelligence.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                    {/* Connector Line (Hidden on mobile) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 z-0"></div>
                    {steps.map((step) => (
                        <div key={step.number} className="relative z-10 bg-zinc-950 p-6">
                            <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-black font-bold mb-6 mx-auto">
                                {step.number}
                            </div>
                            <h4 className="text-lg font-bold text-center mb-2">
                                {step.title}
                            </h4>
                            <p className="text-sm text-gray-500 text-center">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
