"use client";

import { Component, ReactNode } from "react";
import { logError } from "@/lib/logger";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

/**
 * App-level error boundary that catches render/runtime errors.
 * Shows a friendly message and provides a "Try again" button.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        logError(error, "ErrorBoundary");
        logError(errorInfo.componentStack ?? "No component stack", "ErrorBoundary:stack");
    }

    handleReset = (): void => {
        this.setState({ hasError: false, error: null });
    };

    render(): ReactNode {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div
                    style={{
                        padding: "2rem",
                        textAlign: "center",
                        minHeight: "200px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem",
                    }}
                >
                    <h2 style={{ margin: 0, color: "var(--foreground, #fff)" }}>
                        Something went wrong
                    </h2>
                    <p style={{ margin: 0, color: "var(--muted, #888)" }}>
                        An unexpected error occurred. Please try again.
                    </p>
                    <button
                        onClick={this.handleReset}
                        style={{
                            padding: "0.5rem 1.5rem",
                            cursor: "pointer",
                            backgroundColor: "var(--surface, #333)",
                            color: "var(--foreground, #fff)",
                            border: "1px solid var(--border, #444)",
                            borderRadius: "4px",
                        }}
                    >
                        Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
