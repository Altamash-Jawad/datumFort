import { services } from "../constants";

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
                                    {service.icon}
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