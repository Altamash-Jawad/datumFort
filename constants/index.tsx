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
    name: string;
    icon: ReactNode;
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
        icon: "🧠",
    },
    {
        title: "Intelligent Chatbots",
        description:
            "Agentic workflows that handle complex customer service and internal inquiries.",
        icon: "💬",
    },
    {
        title: "Workflow Automation",
        description:
            "End-to-end process automation reducing manual overhead by up to 70%.",
        icon: "⚙️",
    },
    {
        title: "Predictive Analytics",
        description:
            "Forecasting market trends and operational anomalies with high precision.",
        icon: "📈",
    },
    {
        title: "Computer Vision",
        description:
            "Industrial visual inspection and spatial intelligence systems.",
        icon: "👁️",
    },
    {
        title: "MLOps",
        description:
            "CI/CD for machine learning. Robust, scalable, and reproducible models.",
        icon: "🔁",
    },
];

export const steps: Step[] = [
    {
        number: "01",
        title: "Discovery Call",
        description:
            "A focused session where we map your workflows, data, and the use cases where AI moves the metrics your board cares about.",
        deliverable: "A prioritized opportunity map. No cost, no commitment.",
    },
    {
        number: "02",
        title: "Roadmap & Proposal",
        description:
            "We translate the highest-impact opportunity into a clear scope, timeline, and fixed price, so you know exactly what you're getting before we start.",
        deliverable: "A fixed-scope plan with defined ROI and milestones.",
    },
    {
        number: "03",
        title: "Build & Deploy",
        description:
            "Our team designs, tests, and ships the system into your existing stack, with no rip-and-replace. You get weekly updates and a working product, not a deck.",
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
    { name: "Financial Services", icon: "💳" },
    { name: "Healthcare", icon: "🏥" },
    { name: "Software", icon: "💻" },
    { name: "Government", icon: "🏛️" },
    { name: "Manufacturing", icon: "🏭" },
    { name: "Operations", icon: "⚙️" },
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
            "No. We meet you where you are: building the pipelines, infrastructure, and governance that production-grade AI depends on is part of the work.",
    },
    {
        question: "Will the AI run on our own infrastructure?",
        answer:
            "Yes. We deploy into your existing stack, whether cloud or on-prem, so your data and your models stay under your control. No rip-and-replace.",
    },
    {
        question: "How do you handle security and compliance?",
        answer:
            "Every system is built security-first and mapped to standards like GDPR and HIPAA, with bias mitigation and explainability baked in through our Ethos Framework.",
    },
    {
        question: "What does an engagement cost?",
        answer:
            "We scope a fixed price after the discovery call, so you know the investment and the expected ROI before any build begins, with no open-ended billing.",
    },
    {
        question: "What if we're not sure AI is the right fit?",
        answer:
            "That's exactly what the free discovery call is for. We map the opportunities honestly, and we'll tell you if AI isn't the right answer.",
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
// Calendly event URL, e.g. https://calendly.com/quidity/discovery-call
export const CALENDLY_URL: string =
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "https://calendly.com/your-handle/discovery-call";
