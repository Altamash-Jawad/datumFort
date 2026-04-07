"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface ContactFormData {
    name: string;
    email: string;
    company: string;
    message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
    const [status, setStatus] = useState<SubmitStatus>("idle");
    const [apiError, setApiError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({ mode: "onTouched" });

    const onSubmit = async (data: ContactFormData) => {
        setStatus("loading");
        setApiError("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const json = await res.json();

            if (!res.ok) {
                setApiError(json.error ?? "Something went wrong. Please try again.");
                setStatus("error");
                return;
            }

            setStatus("success");
            reset();
        } catch {
            setApiError("Network error. Please check your connection and try again.");
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="py-32 bg-zinc-950 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Heading & Info */}
                    <div>
                        <h2 className="text-4xl font-extrabold mb-6">Get in Touch</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                            Have a project in mind or want to learn how Data Kurator can
                            accelerate your AI journey? Fill out the form and our team will
                            get back to you within 24 hours.
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center">
                                    <svg className="h-5 w-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                    </svg>
                                </div>
                                <span className="text-gray-300">info@datakurator.com</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center">
                                    <svg className="h-5 w-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                    </svg>
                                </div>
                                <span className="text-gray-300">Worldwide — Remote First</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-8 md:p-10">
                        {status === "success" ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                                <div className="w-14 h-14 rounded-full bg-teal-500/20 flex items-center justify-center">
                                    <svg className="h-7 w-7 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                                <p className="text-gray-400">Thank you! We&apos;ll get back to you within 24 hours.</p>
                                <button
                                    className="mt-4 text-teal-400 hover:text-teal-300 text-sm underline"
                                    onClick={() => setStatus("idle")}
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="contact-name">
                                            Full Name
                                        </label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            placeholder="John Doe"
                                            className={`w-full px-4 py-3 rounded-lg bg-zinc-800 border text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors ${
                                                errors.name ? "border-red-500" : "border-white/10"
                                            }`}
                                            {...register("name", {
                                                required: "Full name is required.",
                                                minLength: { value: 2, message: "Name must be at least 2 characters." },
                                                maxLength: { value: 100, message: "Name must be 100 characters or fewer." },
                                            })}
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-xs text-red-400" role="alert">{errors.name.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="contact-email">
                                            Email Address
                                        </label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            placeholder="john@company.com"
                                            className={`w-full px-4 py-3 rounded-lg bg-zinc-800 border text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors ${
                                                errors.email ? "border-red-500" : "border-white/10"
                                            }`}
                                            {...register("email", {
                                                required: "Email address is required.",
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Please enter a valid email address.",
                                                },
                                            })}
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-red-400" role="alert">{errors.email.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="contact-company">
                                        Company
                                    </label>
                                    <input
                                        id="contact-company"
                                        type="text"
                                        placeholder="Your Company"
                                        className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors"
                                        {...register("company", {
                                            maxLength: { value: 100, message: "Company name must be 100 characters or fewer." },
                                        })}
                                    />
                                    {errors.company && (
                                        <p className="mt-1 text-xs text-red-400" role="alert">{errors.company.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="contact-message">
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        placeholder="Tell us about your project..."
                                        rows={5}
                                        className={`w-full px-4 py-3 rounded-lg bg-zinc-800 border text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors resize-none ${
                                            errors.message ? "border-red-500" : "border-white/10"
                                        }`}
                                        {...register("message", {
                                            required: "Message is required.",
                                            minLength: { value: 10, message: "Message must be at least 10 characters." },
                                            maxLength: { value: 5000, message: "Message must be 5000 characters or fewer." },
                                        })}
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-xs text-red-400" role="alert">{errors.message.message}</p>
                                    )}
                                </div>

                                {status === "error" && (
                                    <p className="text-red-400 text-sm" role="alert">{apiError}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full bg-teal-500 hover:bg-teal-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    {status === "loading" ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                            </svg>
                                            Sending…
                                        </>
                                    ) : "Send Message"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}