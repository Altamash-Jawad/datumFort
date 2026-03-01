const services = [
  {
    title: "Generative AI",
    description:
      "Custom LLM orchestration and fine-tuning for proprietary enterprise knowledge.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Intelligent Chatbots",
    description:
      "Agentic workflows that handle complex customer service and internal inquiries.",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
  },
  {
    title: "Workflow Automation",
    description:
      "End-to-end process automation reducing manual overhead by up to 70%.",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
  {
    title: "Predictive Analytics",
    description:
      "Forecasting market trends and operational anomalies with high precision.",
    icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
  },
  {
    title: "Computer Vision",
    description:
      "Industrial visual inspection and spatial intelligence systems.",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    icon2: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  },
  {
    title: "MLOps",
    description:
      "CI/CD for machine learning. Robust, scalable, and reproducible models.",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.722 2.528a2 2 0 00.335 1.815l1.557 1.557a2 2 0 002.828 0l2.372-2.372a2 2 0 000-2.828l-1.001-1.001z",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-4">Services</h2>
          <div className="w-20 h-1 bg-teal-500"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-8 border border-white/10 bg-zinc-900/50 hover:bg-zinc-800 transition-colors group"
            >
              <div className="mb-6 text-teal-400">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d={service.icon}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  {service.icon2 && (
                    <path
                      d={service.icon2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  )}
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
