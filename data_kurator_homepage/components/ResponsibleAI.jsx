const pillars = [
  "Bias Mitigation",
  "GDPR/HIPAA Compliant",
  "Model Explainability",
  "Zero-Trust Data Access",
];

export default function ResponsibleAI() {
  return (
    <section className="py-32 bg-gradient-to-b from-black to-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-teal-900/10 border border-teal-500/20 rounded-3xl p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <svg
              className="h-64 w-64"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
              />
            </svg>
          </div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl font-extrabold mb-8">
              Responsible AI at Our Core.
            </h2>
            <div className="space-y-6 text-lg text-gray-300">
              <p>
                We believe enterprise intelligence is only as strong as its
                ethical foundation. Our proprietary{" "}
                <strong>Ethos Framework</strong> ensures every model we deploy
                is rigorous in bias mitigation and built with security-first
                architectures.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-semibold uppercase tracking-widest text-teal-400">
                {pillars.map((pillar) => (
                  <li key={pillar} className="flex items-center">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                    {pillar}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
