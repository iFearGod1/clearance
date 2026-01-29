"use client";

import Link from "next/link";
import { usePermits } from "@/lib/usePermits";

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
          <p>No permits available.</p>
        )}

        {!loading && permits.length > 0 && (
          <ul style={{ marginTop: "1rem" }}>
            {permits.map((permit) => (
              <li key={permit.id} style={{ marginBottom: "0.75rem" }}>
                <Link href={`/permits/${permit.id}`}>
                  {permit.title}
                </Link>{" "}
                — <span>{permit.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
