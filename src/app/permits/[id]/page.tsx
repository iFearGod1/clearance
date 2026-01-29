"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
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
    in_review: "In Review",
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

function formatDate(dateString: string | undefined) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PermitDetailPage() {
  const params = useParams();
  const rawId = params.id;
  const permitId = Array.isArray(rawId) ? rawId[0] : (rawId as string | undefined);
  const { permits, loading } = usePermits();

  const permit = permits.find((p) => p.id === permitId);

  if (loading) {
    return (
      <div style={{ padding: "2rem" }}>
        <div className="glass-panel">
          <p>Loading permit…</p>
        </div>
      </div>
    );
  }

  if (!permit) {
    return (
      <div style={{ padding: "2rem" }}>
        <Link href="/permits" style={{ display: "block", marginBottom: "1.5rem" }}>
          ← Back to Permits
        </Link>
        <div className="glass-panel">
          <h1>Permit Not Found</h1>
          <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
            This permit may have been removed or the ID is incorrect.
          </p>
          <p style={{ marginTop: "1rem" }}>
            <Link href="/permits">View all permits</Link>
          </p>
        </div>
      </div>
    );
  }

  const jurisdictionLabel =
    JURISDICTION_LABELS[permit.jurisdictionId] ?? permit.jurisdictionId;

  return (
    <div style={{ padding: "2rem" }}>
      <Link href="/permits" style={{ display: "block", marginBottom: "1.5rem" }}>
        ← Back to Permits
      </Link>

      <div className="glass-panel">
        <h1>{permit.title}</h1>

        <dl style={{ marginTop: "1.5rem", lineHeight: 2 }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <dt style={{ color: "var(--muted)", minWidth: "100px" }}>Status</dt>
            <dd>{humanizeStatus(permit.status)}</dd>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <dt style={{ color: "var(--muted)", minWidth: "100px" }}>Jurisdiction</dt>
            <dd>{jurisdictionLabel}</dd>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <dt style={{ color: "var(--muted)", minWidth: "100px" }}>Created</dt>
            <dd>{formatDate(permit.createdAt)}</dd>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <dt style={{ color: "var(--muted)", minWidth: "100px" }}>Updated</dt>
            <dd>{formatDate(permit.updatedAt)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
