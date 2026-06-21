"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Script from "next/script";
import {
    CALENDLY_URL,
    companySizeOptions,
    budgetOptions,
    helpTopicOptions,
} from "../constants";

interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    companySize: string;
    phone: string;
    title: string;
    helpWith: string;
    budget: string;
    message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";
type ContactTab = "book" | "message";

declare global {
    interface Window {
        Calendly?: {
            initInlineWidget: (opts: {
                url: string;
                parentElement: HTMLElement;
            }) => void;
        };
    }
}

export default function ContactSection() {
    const [tab, setTab] = useState<ContactTab>("book");
    const [calendlyLoaded, setCalendlyLoaded] = useState(false);
    const calendlyRef = useRef<HTMLDivElement>(null);

    const [status, setStatus] = useState<SubmitStatus>("idle");
    const [apiError, setApiError] = useState("");

    // (Re)initialise the Calendly inline widget whenever the booking tab
    // becomes active and the embed script is available.
    useEffect(() => {
        if (
            tab === "book" &&
            calendlyLoaded &&
            window.Calendly &&
            calendlyRef.current
        ) {
            calendlyRef.current.innerHTML = "";
            window.Calendly.initInlineWidget({
                url: CALENDLY_URL,
                parentElement: calendlyRef.current,
            });
        }
    }, [tab, calendlyLoaded]);

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
                            Ready to see where AI can move the needle for your
                            organization? Book a free 30-minute discovery call, or
                            send us a message and our team will respond within 24
                            hours.
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

                    {/* Right: Booking + Contact Form (tabbed) */}
                    <div className="bg-zinc-900/60 border border-white/10 rounded-2xl overflow-hidden">
                        {/* Tab bar */}
                        <div role="tablist" aria-label="Contact options" className="flex border-b border-white/10">
                            <button
                                type="button"
                                role="tab"
                                aria-selected={tab === "book"}
                                onClick={() => setTab("book")}
                                className={`flex-1 px-4 py-4 text-sm font-bold transition-colors ${
                                    tab === "book"
                                        ? "bg-teal-500/10 text-teal-400 border-b-2 border-teal-500"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                Book a Call
                            </button>
                            <button
                                type="button"
                                role="tab"
                                aria-selected={tab === "message"}
                                onClick={() => setTab("message")}
                                className={`flex-1 px-4 py-4 text-sm font-bold transition-colors ${
                                    tab === "message"
                                        ? "bg-teal-500/10 text-teal-400 border-b-2 border-teal-500"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                Send a Message
                            </button>
                        </div>

                        {tab === "book" ? (
                            <div role="tabpanel" className="p-2 sm:p-4">
                                <Script
                                    src="https://assets.calendly.com/assets/external/widget.js"
                                    strategy="lazyOnload"
                                    onLoad={() => setCalendlyLoaded(true)}
                                />
                                <div
                                    ref={calendlyRef}
                                    className="calendly-inline-widget rounded-lg overflow-hidden"
                                    style={{ minWidth: "320px", height: "660px" }}
                                >
                                    {/* Fallback shown until the Calendly widget initialises */}
                                    <div className="flex flex-col items-center justify-center h-full text-center gap-3 text-gray-400">
                                        <p>Loading scheduler…</p>
                                        <a
                                            href={CALENDLY_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-teal-400 hover:text-teal-300 underline text-sm"
                                        >
                                            Open the booking page in a new tab
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div role="tabpanel" className="p-8 md:p-10">
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
                                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="contact-first-name">
                                            First Name
                                        </label>
                                        <input
                                            id="contact-first-name"
                                            type="text"
                                            placeholder="John"
                                            className={`w-full px-4 py-3 rounded-lg bg-zinc-800 border text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors ${
                                                errors.firstName ? "border-red-500" : "border-white/10"
                                            }`}
                                            {...register("firstName", {
                                                required: "First name is required.",
                                                minLength: { value: 2, message: "First name must be at least 2 characters." },
                                                maxLength: { value: 100, message: "First name must be 100 characters or fewer." },
                                            })}
                                        />
                                        {errors.firstName && (
                                            <p className="mt-1 text-xs text-red-400" role="alert">{errors.firstName.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="contact-last-name">
                                            Last Name
                                        </label>
                                        <input
                                            id="contact-last-name"
                                            type="text"
                                            placeholder="Doe"
                                            className={`w-full px-4 py-3 rounded-lg bg-zinc-800 border text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors ${
                                                errors.lastName ? "border-red-500" : "border-white/10"
                                            }`}
                                            {...register("lastName", {
                                                required: "Last name is required.",
                                                minLength: { value: 2, message: "Last name must be at least 2 characters." },
                                                maxLength: { value: 100, message: "Last name must be 100 characters or fewer." },
                                            })}
                                        />
                                        {errors.lastName && (
                                            <p className="mt-1 text-xs text-red-400" role="alert">{errors.lastName.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="contact-email">
                                            Email
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
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="contact-phone">
                                            Phone <span className="text-gray-600">(optional)</span>
                                        </label>
                                        <input
                                            id="contact-phone"
                                            type="tel"
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors"
                                            {...register("phone", {
                                                maxLength: { value: 50, message: "Phone must be 50 characters or fewer." },
                                            })}
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-xs text-red-400" role="alert">{errors.phone.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="contact-company-size">
                                            Company Size
                                        </label>
                                        <select
                                            id="contact-company-size"
                                            defaultValue=""
                                            className={`w-full px-4 py-3 rounded-lg bg-zinc-800 border text-white focus:outline-none focus:border-teal-500 transition-colors ${
                                                errors.companySize ? "border-red-500" : "border-white/10"
                                            }`}
                                            {...register("companySize", {
                                                required: "Please select your company size.",
                                            })}
                                        >
                                            <option value="" disabled>
                                                Select company size
                                            </option>
                                            {companySizeOptions.map((size) => (
                                                <option key={size} value={size}>
                                                    {size} employees
                                                </option>
                                            ))}
                                        </select>
                                        {errors.companySize && (
                                            <p className="mt-1 text-xs text-red-400" role="alert">{errors.companySize.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="contact-title">
                                            Your Department/Title
                                        </label>
                                        <input
                                            id="contact-title"
                                            type="text"
                                            placeholder="e.g. Head of Operations"
                                            className={`w-full px-4 py-3 rounded-lg bg-zinc-800 border text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors ${
                                                errors.title ? "border-red-500" : "border-white/10"
                                            }`}
                                            {...register("title", {
                                                required: "Your department or title is required.",
                                                maxLength: { value: 150, message: "Must be 150 characters or fewer." },
                                            })}
                                        />
                                        {errors.title && (
                                            <p className="mt-1 text-xs text-red-400" role="alert">{errors.title.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="contact-help-with">
                                            How can we help?
                                        </label>
                                        <select
                                            id="contact-help-with"
                                            defaultValue=""
                                            className={`w-full px-4 py-3 rounded-lg bg-zinc-800 border text-white focus:outline-none focus:border-teal-500 transition-colors ${
                                                errors.helpWith ? "border-red-500" : "border-white/10"
                                            }`}
                                            {...register("helpWith", {
                                                required: "Please select how we can help.",
                                            })}
                                        >
                                            <option value="" disabled>
                                                Select a topic
                                            </option>
                                            {helpTopicOptions.map((topic) => (
                                                <option key={topic} value={topic}>
                                                    {topic}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.helpWith && (
                                            <p className="mt-1 text-xs text-red-400" role="alert">{errors.helpWith.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="contact-budget">
                                            Budget <span className="text-gray-600">(optional)</span>
                                        </label>
                                        <select
                                            id="contact-budget"
                                            defaultValue=""
                                            className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-white/10 text-white focus:outline-none focus:border-teal-500 transition-colors"
                                            {...register("budget")}
                                        >
                                            <option value="">Select a budget range</option>
                                            {budgetOptions.map((range) => (
                                                <option key={range} value={range}>
                                                    {range}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.budget && (
                                            <p className="mt-1 text-xs text-red-400" role="alert">{errors.budget.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="contact-message">
                                        Message <span className="text-gray-600">(optional)</span>
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        placeholder="Tell us about your AI goals, needs, and challenges — and the vision you want to achieve."
                                        rows={5}
                                        className={`w-full px-4 py-3 rounded-lg bg-zinc-800 border text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors resize-none ${
                                            errors.message ? "border-red-500" : "border-white/10"
                                        }`}
                                        {...register("message", {
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
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}