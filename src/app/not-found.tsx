import Link from "next/link";

export default function NotFound() {
    return (
        <div style={{ padding: "2rem" }}>
            <div className="glass-panel" style={{ textAlign: "center", padding: "2rem" }}>
                <h1>Page Not Found</h1>
                <p style={{ color: "var(--muted)", margin: "1rem 0" }}>
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    style={{
                        display: "inline-block",
                        marginTop: "1rem",
                        padding: "0.5rem 1.5rem",
                        backgroundColor: "var(--surface, #333)",
                        color: "var(--foreground, #fff)",
                        border: "1px solid var(--border, #444)",
                        borderRadius: "4px",
                        textDecoration: "none",
                    }}
                >
                    Return to Dashboard
                </Link>
            </div>
        </div>
    );
}
