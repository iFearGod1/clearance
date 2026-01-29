import Link from "next/link";
import UtilityPanel from "@/modules/calculator/components/UtilityPanel";

export default function UtilityPage() {
    return (
        <>
            <div
                style={{
                    padding: "1.5rem 1.5rem 0",
                }}
            >
                <Link
                    href="/"
                    style={{
                        color: "var(--muted)",
                        fontSize: "0.9rem",
                        textDecoration: "none",
                    }}
                >
                    ← Back to Dashboard
                </Link>
            </div>
            <UtilityPanel />
        </>
    );
}
