"use client";

import { Component, ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: { componentStack: string }) {
        console.error("[ErrorBoundary]", error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback ?? (
                    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                        <p className="text-gray-400 text-lg mb-2">Something went wrong.</p>
                        <button
                            className="mt-4 text-teal-400 hover:text-teal-300 text-sm underline"
                            onClick={() => this.setState({ hasError: false, error: null })}
                        >
                            Try again
                        </button>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}