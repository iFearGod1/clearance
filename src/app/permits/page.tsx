"use client";

import Link from "next/link";
import { usePermits } from "@/lib/usePermits";

function humanizeStatus(status: string) {
  const map: Record<string, string> = {
    draft: "Draft",
    submitted: "Submitted",
    in_review: "In review",
    approved: "Approved",
    denied: "Denied",
    active: "Active",
    closed: "Closed",
  };

  if (map[status]) return map[status];

  return status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function PermitsPage() {
  const { permits, loading } = usePermits();

  return (
    <div style={{ padding: "2rem" }}>
      <Link href="/" style={{ display: "block", marginBottom: "1.5rem" }}>
        ← Back to Dashboard
      </Link>

      <div className="glass-panel">
        <h1>Permits</h1>

        {loading && <p>Loading permits…</p>}

        {!loading && permits.length === 0 && (
          <div>
            <p>No permits yet.</p>
            <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
              Create your first permit to start tracking approvals, inspections, and invoices.
            </p>
          </div>
        )}

        {!loading && permits.length > 0 && (
          <ul style={{ marginTop: "1rem" }}>
            {permits.map((permit) => (
              <li key={permit.id} style={{ marginBottom: "0.75rem" }}>
                <Link href={`/permits/${permit.id}`}>
                  {permit.title}
                </Link>{" "}
                — <span>{humanizeStatus(permit.status)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
