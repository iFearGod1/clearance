"use client";

import Link from "next/link";
import { usePermits } from "@/lib/usePermits";
import { getPermitStatusLabel } from "@/lib/domain";

export default function PermitsPage() {
  const { permits, loading, error, refresh } = usePermits();

  return (
    <div style={{ padding: "2rem" }}>
      <Link href="/" style={{ display: "block", marginBottom: "1.5rem" }}>
        ← Back to Dashboard
      </Link>

      <div className="glass-panel">
        <h1>Permits</h1>

        {loading && <p>Loading permits…</p>}

        {!loading && error && (
          <div style={{ padding: "1rem 0" }}>
            <p style={{ color: "var(--error, #dc3545)" }}>Error: {error}</p>
            <button
              onClick={() => refresh()}
              style={{
                marginTop: "0.5rem",
                padding: "0.5rem 1rem",
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && permits.length === 0 && (
          <div>
            <p>No permits yet.</p>
            <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
              Create your first permit to start tracking approvals, inspections, and invoices.
            </p>
          </div>
        )}

        {!loading && !error && permits.length > 0 && (
          <ul style={{ marginTop: "1rem" }}>
            {permits.map((permit) => (
              <li key={permit.id} style={{ marginBottom: "0.75rem" }}>
                <Link href={`/permits/${permit.id}`}>
                  {permit.title}
                </Link>{" "}
                — <span>{getPermitStatusLabel(permit.status)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
