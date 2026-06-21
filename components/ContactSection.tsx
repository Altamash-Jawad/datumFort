"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
type WidgetState = "loading" | "ready" | "error";

const CALENDLY_SCRIPT_SRC =
    "https://assets.calendly.com/assets/external/widget.js";

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
    const calendlyRef = useRef<HTMLDivElement>(null);
    const [widgetState, setWidgetState] = useState<WidgetState>("loading");

    const [status, setStatus] = useState<SubmitStatus>("idle");
    const [apiError, setApiError] = useState("");

    // Load the Calendly script ourselves (rather than next/script) and embed the
    // inline widget whenever the booking tab is active. Manual injection is
    // deterministic: we know exactly when it loads, when it fails, and we can
    // re-embed on tab switches without relying on an onLoad callback that won't
    // refire once the script is cached.
    useEffect(() => {
        if (tab !== "book") return;

        let cancelled = false;

        const embed = () => {
            if (cancelled || !calendlyRef.current || !window.Calendly) return false;
            calendlyRef.current.innerHTML = "";
            window.Calendly.initInlineWidget({
                url: CALENDLY_URL,
                parentElement: calendlyRef.current,
            });
            setWidgetState("ready");
            return true;
        };

        // Ensure the script tag exists (only inject once across the whole app).
        if (
            !document.querySelector(`script[src="${CALENDLY_SCRIPT_SRC}"]`)
        ) {
            const script = document.createElement("script");
            script.src = CALENDLY_SCRIPT_SRC;
            script.async = true;
            document.body.appendChild(script);
        }

        // Poll for window.Calendly rather than trusting the script's load event.
        // Polling is robust against script caching, React StrictMode's
        // double-mount, and the fact that some browsers' tracking protection
        // silently prevents the script from ever executing. ~60 * 200ms ≈ 12s.
        setWidgetState("loading");
        let attempts = 0;
        const poll = window.setInterval(() => {
            if (cancelled) return;
            if (window.Calendly) {
                window.clearInterval(poll);
                embed();
            } else if (++attempts >= 60) {
                window.clearInterval(poll);
                setWidgetState("error");
            }
        }, 200);

        // Try immediately too (script may already be loaded on tab re-entry).
        if (embed()) window.clearInterval(poll);

        return () => {
            cancelled = true;
            window.clearInterval(poll);
        };
    }, [tab]);

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
        <section id="contact" className="py-32 bg-surface border-t border-edge">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Heading & Info */}
                    <div>
                        <h2 className="text-4xl font-semibold mb-6 tracking-tight text-t1">Get in Touch</h2>
                        <p className="text-t2 text-lg leading-relaxed mb-10 max-w-lg">
                            Ready to see where AI can move the needle for your
                            organization? Book a free 30-minute discovery call, or
                            send us a message and our team will respond within 24
                            hours.
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center">
                                    <svg className="h-5 w-5 text-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                    </svg>
                                </div>
                                <span className="text-t2">info@datakurator.com</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center">
                                    <svg className="h-5 w-5 text-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                    </svg>
                                </div>
                                <span className="text-t2">Worldwide — Remote First</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Booking + Contact Form (tabbed) */}
                    <div className="bg-base border border-edge rounded-2xl overflow-hidden">
                        {/* Tab bar */}
                        <div role="tablist" aria-label="Contact options" className="flex border-b border-edge">
                            <button
                                type="button"
                                role="tab"
                                aria-selected={tab === "book"}
                                onClick={() => setTab("book")}
                                className={`flex-1 px-4 py-4 text-sm font-bold transition-colors ${
                                    tab === "book"
                                        ? "bg-surface-2 text-violet border-b-2 border-violet"
                                        : "text-t2 hover:text-t1"
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
                                        ? "bg-surface-2 text-violet border-b-2 border-violet"
                                        : "text-t2 hover:text-t1"
                                }`}
                            >
                                Send a Message
                            </button>
                        </div>

                        {tab === "book" ? (
                            <div role="tabpanel" className="p-2 sm:p-4">
                                {/* Container is positioning context only. The Calendly mount node
                                    below MUST stay empty of React children — Calendly injects its
                                    own iframe via raw DOM, so React must never reconcile inside it.
                                    The fallback is a separate sibling overlay. */}
                                <div
                                    className="relative rounded-lg overflow-hidden h-[1000px] sm:h-[760px] md:h-[700px]"
                                    style={{ minWidth: "320px" }}
                                >
                                    {/* No `calendly-inline-widget` class here on purpose: that
                                        class makes Calendly's widget.js auto-init scan this node and
                                        read a `data-url` attribute we don't set, which throws
                                        "Cannot read properties of null (reading 'split')". We init
                                        manually via initInlineWidget({ url, parentElement }) instead. */}
                                    <div ref={calendlyRef} className="h-full w-full" />

                                    {widgetState !== "ready" && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-5 px-6 bg-base">
                                            {widgetState === "error" ? (
                                                <p className="text-t2 text-sm max-w-xs">
                                                    The scheduler couldn&apos;t load — this is
                                                    usually browser tracking protection or a privacy
                                                    extension blocking Calendly. You can still book
                                                    using the link below.
                                                </p>
                                            ) : (
                                                <>
                                                    <svg
                                                        className="animate-spin h-7 w-7 text-violet"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        aria-hidden="true"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        />
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8v8z"
                                                        />
                                                    </svg>
                                                    <p className="text-t2 text-sm">
                                                        Loading scheduler…
                                                    </p>
                                                </>
                                            )}
                                            <a
                                                href={CALENDLY_URL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-ghost text-sm font-medium px-4 py-2 rounded-lg"
                                            >
                                                Or open the booking page in a new tab
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div role="tabpanel" className="p-8 md:p-10">
                        {status === "success" ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                                <div className="w-14 h-14 rounded-full bg-surface-2 flex items-center justify-center">
                                    <svg className="h-7 w-7 text-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-t1">Message Sent!</h3>
                                <p className="text-t2">Thank you! We&apos;ll get back to you within 24 hours.</p>
                                <button
                                    className="mt-4 text-violet hover:text-violet text-sm underline"
                                    onClick={() => setStatus("idle")}
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <div className="flex items-center gap-1 mb-2">
                                            <label className="text-sm font-medium text-t2" htmlFor="contact-first-name">
                                                First Name
                                            </label>
                                            <span className="text-red-400 text-sm" aria-hidden="true">*</span>
                                        </div>
                                        <input
                                            id="contact-first-name"
                                            type="text"
                                            placeholder="John"
                                            aria-invalid={errors.firstName ? "true" : undefined}
                                            aria-describedby={errors.firstName ? "contact-first-name-error" : undefined}
                                            className={`w-full px-4 py-3 rounded-lg bg-surface border text-t1 placeholder-t3 focus:outline-none focus:border-violet transition-colors ${
                                                errors.firstName ? "border-red-500" : "border-edge"
                                            }`}
                                            {...register("firstName", {
                                                required: "First name is required.",
                                                minLength: { value: 2, message: "First name must be at least 2 characters." },
                                                maxLength: { value: 100, message: "First name must be 100 characters or fewer." },
                                            })}
                                        />
                                        {errors.firstName && (
                                            <p id="contact-first-name-error" className="mt-1 text-xs text-red-400" role="alert">{errors.firstName.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1 mb-2">
                                            <label className="text-sm font-medium text-t2" htmlFor="contact-last-name">
                                                Last Name
                                            </label>
                                            <span className="text-red-400 text-sm" aria-hidden="true">*</span>
                                        </div>
                                        <input
                                            id="contact-last-name"
                                            type="text"
                                            placeholder="Doe"
                                            aria-invalid={errors.lastName ? "true" : undefined}
                                            aria-describedby={errors.lastName ? "contact-last-name-error" : undefined}
                                            className={`w-full px-4 py-3 rounded-lg bg-surface border text-t1 placeholder-t3 focus:outline-none focus:border-violet transition-colors ${
                                                errors.lastName ? "border-red-500" : "border-edge"
                                            }`}
                                            {...register("lastName", {
                                                required: "Last name is required.",
                                                minLength: { value: 2, message: "Last name must be at least 2 characters." },
                                                maxLength: { value: 100, message: "Last name must be 100 characters or fewer." },
                                            })}
                                        />
                                        {errors.lastName && (
                                            <p id="contact-last-name-error" className="mt-1 text-xs text-red-400" role="alert">{errors.lastName.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <div className="flex items-center gap-1 mb-2">
                                            <label className="text-sm font-medium text-t2" htmlFor="contact-email">
                                                Email
                                            </label>
                                            <span className="text-red-400 text-sm" aria-hidden="true">*</span>
                                        </div>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            placeholder="john@company.com"
                                            aria-invalid={errors.email ? "true" : undefined}
                                            aria-describedby={errors.email ? "contact-email-error" : undefined}
                                            className={`w-full px-4 py-3 rounded-lg bg-surface border text-t1 placeholder-t3 focus:outline-none focus:border-violet transition-colors ${
                                                errors.email ? "border-red-500" : "border-edge"
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
                                            <p id="contact-email-error" className="mt-1 text-xs text-red-400" role="alert">{errors.email.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-t2 mb-2" htmlFor="contact-phone">
                                            Phone <span className="text-t3">(optional)</span>
                                        </label>
                                        <input
                                            id="contact-phone"
                                            type="tel"
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full px-4 py-3 rounded-lg bg-surface border border-edge text-t1 placeholder-t3 focus:outline-none focus:border-violet transition-colors"
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
                                        <div className="flex items-center gap-1 mb-2">
                                            <label className="text-sm font-medium text-t2" htmlFor="contact-company-size">
                                                Company Size
                                            </label>
                                            <span className="text-red-400 text-sm" aria-hidden="true">*</span>
                                        </div>
                                        <select
                                            id="contact-company-size"
                                            defaultValue=""
                                            aria-invalid={errors.companySize ? "true" : undefined}
                                            aria-describedby={errors.companySize ? "contact-company-size-error" : undefined}
                                            className={`w-full px-4 py-3 rounded-lg bg-surface border text-t1 focus:outline-none focus:border-violet transition-colors ${
                                                errors.companySize ? "border-red-500" : "border-edge"
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
                                            <p id="contact-company-size-error" className="mt-1 text-xs text-red-400" role="alert">{errors.companySize.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1 mb-2">
                                            <label className="text-sm font-medium text-t2" htmlFor="contact-title">
                                                Your Department/Title
                                            </label>
                                            <span className="text-red-400 text-sm" aria-hidden="true">*</span>
                                        </div>
                                        <input
                                            id="contact-title"
                                            type="text"
                                            placeholder="e.g. Head of Operations"
                                            aria-invalid={errors.title ? "true" : undefined}
                                            aria-describedby={errors.title ? "contact-title-error" : undefined}
                                            className={`w-full px-4 py-3 rounded-lg bg-surface border text-t1 placeholder-t3 focus:outline-none focus:border-violet transition-colors ${
                                                errors.title ? "border-red-500" : "border-edge"
                                            }`}
                                            {...register("title", {
                                                required: "Your department or title is required.",
                                                maxLength: { value: 150, message: "Must be 150 characters or fewer." },
                                            })}
                                        />
                                        {errors.title && (
                                            <p id="contact-title-error" className="mt-1 text-xs text-red-400" role="alert">{errors.title.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <div className="flex items-center gap-1 mb-2">
                                            <label className="text-sm font-medium text-t2" htmlFor="contact-help-with">
                                                How can we help?
                                            </label>
                                            <span className="text-red-400 text-sm" aria-hidden="true">*</span>
                                        </div>
                                        <select
                                            id="contact-help-with"
                                            defaultValue=""
                                            aria-invalid={errors.helpWith ? "true" : undefined}
                                            aria-describedby={errors.helpWith ? "contact-help-with-error" : undefined}
                                            className={`w-full px-4 py-3 rounded-lg bg-surface border text-t1 focus:outline-none focus:border-violet transition-colors ${
                                                errors.helpWith ? "border-red-500" : "border-edge"
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
                                            <p id="contact-help-with-error" className="mt-1 text-xs text-red-400" role="alert">{errors.helpWith.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-t2 mb-2" htmlFor="contact-budget">
                                            Budget <span className="text-t3">(optional)</span>
                                        </label>
                                        <select
                                            id="contact-budget"
                                            defaultValue=""
                                            className="w-full px-4 py-3 rounded-lg bg-surface border border-edge text-t1 focus:outline-none focus:border-violet transition-colors"
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
                                    <label className="block text-sm font-medium text-t2 mb-2" htmlFor="contact-message">
                                        Message <span className="text-t3">(optional)</span>
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        placeholder="Tell us about your AI goals, needs, and challenges — and the vision you want to achieve."
                                        rows={5}
                                        className={`w-full px-4 py-3 rounded-lg bg-surface border text-t1 placeholder-t3 focus:outline-none focus:border-violet transition-colors resize-none ${
                                            errors.message ? "border-red-500" : "border-edge"
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
                                    className="btn-accent w-full disabled:opacity-60 disabled:cursor-not-allowed font-semibold py-3.5 rounded-lg flex items-center justify-center gap-2"
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