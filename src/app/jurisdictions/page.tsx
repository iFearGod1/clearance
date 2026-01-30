import Link from "next/link";

export default function JurisdictionsPage() {
    return (
        <div style={{ padding: "2rem" }}>
            <Link href="/" style={{ display: "block", marginBottom: "1.5rem" }}>
                ← Back to Dashboard
            </Link>

            <div className="glass-panel">
                <h1>Jurisdictions</h1>
                <p style={{ color: "var(--muted)", marginTop: "1rem" }}>
                    Coming soon.
                </p>
            </div>
        </div>
    );
}
