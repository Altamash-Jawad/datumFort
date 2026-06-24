"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
    /** Render as a different element (e.g. "li", "article"). Defaults to "div". */
    as?: ElementType;
    /** Stagger delay in milliseconds. */
    delay?: number;
    className?: string;
}

/**
 * Reveals its children with a fade-up transition once they scroll into view.
 *
 * Progressive enhancement: content is rendered immediately and is fully visible
 * without JavaScript. The fade only applies when motion is allowed — users with
 * `prefers-reduced-motion` see content instantly, satisfying the research-backed
 * principle that motion must be functional and never gate access to content.
 */
export default function Reveal({
    children,
    as,
    delay = 0,
    className = "",
}: RevealProps) {
    const Tag = (as ?? "div") as ElementType;
    const ref = useRef<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        // Fall back to fully-visible content when the required browser APIs are
        // missing (SSR, test environments, older browsers) or when the user has
        // asked for reduced motion. Content access never depends on the animation.
        const prefersReduced =
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReduced || typeof IntersectionObserver === "undefined") {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref}
            className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </Tag>
    );
}
