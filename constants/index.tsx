import { ReactNode } from "react";

export interface Service {
    title: string;
    description: string;
    icon: ReactNode;
}

export interface Step {
    number: string;
    title: string;
    description: string;
    deliverable: string;
}

export interface Industry {
    abbr: string;
    name: string;
}

export interface Faq {
    question: string;
    answer: string;
}

export const services: Service[] = [
    {
        title: "Generative AI",
        description:
            "Custom LLM orchestration and fine-tuning for proprietary enterprise knowledge.",
        icon: (
            <path
                d="M13 10V3L4 14h7v7l9-11h-7z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
        ),
    },
    {
        title: "Intelligent Chatbots",
        description:
            "Agentic workflows that handle complex customer service and internal inquiries.",
        icon: (
            <path
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
        ),
    },
    {
        title: "Workflow Automation",
        description:
            "End-to-end process automation reducing manual overhead by up to 70%.",
        icon: (
            <path
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
        ),
    },
    {
        title: "Predictive Analytics",
        description:
            "Forecasting market trends and operational anomalies with high precision.",
        icon: (
            <path
                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
        ),
    },
    {
        title: "Computer Vision",
        description:
            "Industrial visual inspection and spatial intelligence systems.",
        icon: (
            <>
                <path
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
                <path
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
            </>
        ),
    },
    {
        title: "MLOps",
        description:
            "CI/CD for machine learning. Robust, scalable, and reproducible models.",
        icon: (
            <path
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.722 2.528a2 2 0 00.335 1.815l1.557 1.557a2 2 0 002.828 0l2.372-2.372a2 2 0 000-2.828l-1.001-1.001z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
        ),
    },
];

export const steps: Step[] = [
    {
        number: "01",
        title: "Discovery Call",
        description:
            "A focused session where we map your workflows, data, and the use cases where AI moves the metrics your board cares about.",
        deliverable: "A prioritized opportunity map — no cost, no commitment.",
    },
    {
        number: "02",
        title: "Roadmap & Proposal",
        description:
            "We translate the highest-impact opportunity into a clear scope, timeline, and fixed price — so you know exactly what you're getting before we start.",
        deliverable: "A fixed-scope plan with defined ROI and milestones.",
    },
    {
        number: "03",
        title: "Build & Deploy",
        description:
            "Our team designs, tests, and ships the system into your existing stack — no rip-and-replace. You get weekly updates and a working product, not a deck.",
        deliverable: "A production system running inside your infrastructure.",
    },
    {
        number: "04",
        title: "Govern & Scale",
        description:
            "We monitor performance, retrain models, and harden governance so the system stays compliant, accurate, and ready to expand across teams.",
        deliverable: "Ongoing monitoring, optimization, and support.",
    },
];

export const industries: Industry[] = [
    { abbr: "FS", name: "Financial Services" },
    { abbr: "HC", name: "Healthcare" },
    { abbr: "SaaS", name: "Software" },
    { abbr: "GV", name: "Government" },
    { abbr: "MF", name: "Manufacturing" },
    { abbr: "OP", name: "Operations" },
];

export const pillars: string[] = [
    "Bias Mitigation",
    "GDPR/HIPAA Compliant",
    "Model Explainability",
    "Zero-Trust Data Access",
];

export const faqs: Faq[] = [
    {
        question: "How quickly can we see results?",
        answer:
            "Most engagements go from discovery to a working system in production within 4–8 weeks, depending on scope and how ready your data is.",
    },
    {
        question: "Do we need a mature data platform first?",
        answer:
            "No. We meet you where you are — building the pipelines, infrastructure, and governance that production-grade AI depends on is part of the work.",
    },
    {
        question: "Will the AI run on our own infrastructure?",
        answer:
            "Yes. We deploy into your existing stack — cloud or on-prem — so your data and your models stay under your control. No rip-and-replace.",
    },
    {
        question: "How do you handle security and compliance?",
        answer:
            "Every system is built security-first and mapped to standards like GDPR and HIPAA, with bias mitigation and explainability baked in through our Ethos Framework.",
    },
    {
        question: "What does an engagement cost?",
        answer:
            "We scope a fixed price after the discovery call, so you know the investment and the expected ROI before any build begins — no open-ended billing.",
    },
    {
        question: "What if we're not sure AI is the right fit?",
        answer:
            "That's exactly what the free discovery call is for. We map the opportunities honestly — and we'll tell you if AI isn't the right answer.",
    },
];

// Contact-form dropdown options. Shared between the form UI and the API route
// so server-side validation stays in sync with what the user can select.
export const companySizeOptions: string[] = [
    "1-20",
    "21-50",
    "51-200",
    "201-500",
    "501-1100",
    "1101-5000+",
];

export const budgetOptions: string[] = [
    "$0-$50k",
    "$50k-$100k",
    "$100k+",
];

export const helpTopicOptions: string[] = [
    "AI strategy and roadmap",
    "AI training and enablement",
    "Custom AI solution",
    "AI governance and risk",
    "General inquiry",
];

// Scheduling link for the "Book a Call" tab in the contact section.
// Set NEXT_PUBLIC_CALENDLY_URL in your environment (.env.local) to your real
// Calendly event URL, e.g. https://calendly.com/datakurator/discovery-call
export const CALENDLY_URL: string =
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "https://calendly.com/your-handle/discovery-call";