"use client";

import Link from "next/link";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div style={{ padding: "2rem" }}>
            <div className="glass-panel" style={{ textAlign: "center", padding: "2rem" }}>
                <h1>Something went wrong</h1>
                <p style={{ color: "var(--muted)", margin: "1rem 0" }}>
                    An unexpected error occurred. Please try again or return to the dashboard.
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1.5rem" }}>
                    <button
                        onClick={reset}
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
                    <Link
                        href="/"
                        style={{
                            padding: "0.5rem 1.5rem",
                            backgroundColor: "transparent",
                            color: "var(--foreground, #fff)",
                            border: "1px solid var(--border, #444)",
                            borderRadius: "4px",
                            textDecoration: "none",
                        }}
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
