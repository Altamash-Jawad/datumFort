"use client";

import { useState } from "react";
import { faqs } from "../constants";
import Reveal from "./Reveal";

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-32 bg-base scroll-mt-24">
            <div className="max-w-3xl mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-16">
                        <span className="text-xs font-medium uppercase tracking-[0.15em] text-t3">
                            FAQ
                        </span>
                        <h2 className="text-4xl font-semibold mt-3 tracking-tight text-t1">
                            Questions, answered
                        </h2>
                    </div>
                </Reveal>

                <dl className="space-y-4">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        const panelId = `faq-panel-${i}`;
                        const buttonId = `faq-button-${i}`;
                        return (
                            <Reveal key={faq.question} delay={(i % 3) * 60}>
                                <div className="bg-surface border border-edge rounded-2xl overflow-hidden transition-colors hover:border-edge-hover">
                                    <dt>
                                        <button
                                            type="button"
                                            id={buttonId}
                                            aria-expanded={isOpen}
                                            aria-controls={panelId}
                                            onClick={() => setOpenIndex(isOpen ? null : i)}
                                            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-medium text-t1 hover:text-violet transition-colors"
                                        >
                                            <span>{faq.question}</span>
                                            <svg
                                                className={`h-5 w-5 shrink-0 text-violet transition-transform duration-300 ${
                                                    isOpen ? "rotate-45" : ""
                                                }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </dt>
                                    <dd
                                        id={panelId}
                                        role="region"
                                        aria-labelledby={buttonId}
                                        className={`accordion-panel ${isOpen ? "open" : ""}`}
                                    >
                                        <div>
                                            <p className="px-6 pb-6 text-t2 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </dd>
                                </div>
                            </Reveal>
                        );
                    })}
                </dl>
            </div>
        </section>
    );
}
