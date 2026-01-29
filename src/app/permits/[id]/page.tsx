"use client";

import Link from "next/link";
import { usePermits } from "@/lib/usePermits";

const JURISDICTION_LABELS: Record<string, string> = {
  jur_nyc_dob: "NYC DOB",
  jur_la_city: "LA City",
  jur_miami_dade: "Miami-Dade",
};

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

        {!loading && permits.length === 0 && <p>No permits available.</p>}

        {!loading && permits.length > 0 && (
          <ul style={{ marginTop: "1rem" }}>
            {permits.map((permit) => {
              const jurisdictionLabel =
                JURISDICTION_LABELS[permit.jurisdictionId] ?? permit.jurisdictionId;

              return (
                <li key={permit.id} style={{ marginBottom: "0.75rem" }}>
                  <Link href={`/permits/${permit.id}`}>{permit.title}</Link>{" "}
                  — <span>{humanizeStatus(permit.status)}</span>{" "}
                  —{" "}
                  <span style={{ color: "var(--muted)" }}>
                    {jurisdictionLabel} ({permit.jurisdictionId})
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
