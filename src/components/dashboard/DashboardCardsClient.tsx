"use client";

import Link from "next/link";
import { useDashboardSummary } from "@/lib/useDashboardSummary";
import { usePermits } from "@/lib/usePermits";
import { useJurisdictions } from "@/lib/useJurisdictions";
import { getPermitStatusLabel } from "@/lib/domain";
import type { PermitStatus } from "@/types/domain";

function money(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export default function DashboardCardsClient({ styles }: { styles: Record<string, string> }) {
  const { summary, loading, error: summaryError, refresh: refreshSummary } = useDashboardSummary();
  const { permits, loading: permitsLoading, error: permitsError, refresh: refreshPermits } = usePermits();
  const { jurisdictions, loading: jurisdictionsLoading, error: jurisdictionsError, refresh: refreshJurisdictions } = useJurisdictions();

  // Combined error state
  const hasError = summaryError || permitsError || jurisdictionsError;
  const errorMessage = summaryError || permitsError || jurisdictionsError;

  const handleRetryAll = () => {
    refreshSummary();
    refreshPermits();
    refreshJurisdictions();
  };

  // Error state
  if (hasError && !loading && !permitsLoading && !jurisdictionsLoading) {
    return (
      <section className={styles.dashboardGrid}>
        <div className={`glass-panel ${styles.card} ${styles.large}`}>
          <h3>Error Loading Dashboard</h3>
          <p style={{ color: "var(--error, #dc3545)", margin: "1rem 0" }}>{errorMessage}</p>
          <button
            onClick={handleRetryAll}
            style={{
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  // Keep placeholders stable (no layout shifts)
  const inspections = loading
    ? ["Loading…", "Loading…"]
    : [
      `Scheduled: ${summary?.inspections.scheduled ?? 0}`,
      `Complete: ${summary?.inspections.complete ?? 0}`,
    ];

  const invoiceAmount = loading ? "—" : money(summary?.invoices.openAmountCents ?? 0);
  const invoiceLabel = loading ? "Loading" : `Open (${summary?.invoices.open ?? 0})`;

  const jurisdictionTags = jurisdictionsLoading
    ? [
      { id: "loading-1", name: "Loading…" },
      { id: "loading-2", name: "Loading…" },
      { id: "loading-3", name: "Loading…" },
    ]
    : jurisdictions.length === 0
      ? [{ id: "empty", name: "No jurisdictions" }]
      : jurisdictions.slice(0, 3).map((jurisdiction) => ({
        id: jurisdiction.id,
        name: jurisdiction.name,
      }));

  const permitRows = permitsLoading
    ? [
      { id: "loading-1", title: "Loading…", status: "" },
      { id: "loading-2", title: "Loading…", status: "" },
      { id: "loading-3", title: "Loading…", status: "" },
    ]
    : permits.length === 0
      ? [{ id: "empty", title: "No permits yet", status: "" }]
      : permits.slice(0, 3).map((permit) => ({
        id: permit.id,
        title: permit.title,
        status: permit.status,
      }));

  return (
    <section className={styles.dashboardGrid}>
      <div className={`glass-panel ${styles.card} ${styles.large}`}>
        <h3>Permit Approvals</h3>

        {/* keep chart placeholder intact */}
        <div className={styles.placeholderChart}></div>

        {/* list goes BELOW the placeholder chart */}
        <ul className={styles.list}>
          {permitRows.map((permit) => (
            <li key={permit.id}>
              <span>{permit.title}</span>{" "}
              {permit.status ? (
                <span style={{ color: "var(--muted)" }}>— {getPermitStatusLabel(permit.status as PermitStatus)}</span>
              ) : null}
            </li>
          ))}

        </ul>
        <Link
          href="/permits"
          style={{
            color: "var(--muted)",
            fontSize: "0.85rem",
            marginTop: "0.75rem",
            display: "inline-block",
          }}
        >
          View all permits →
        </Link>
      </div>

      <div className={`glass-panel ${styles.card}`}>
        <h3>Inspections</h3>
        <ul className={styles.list}>
          {inspections.map((t, i) => (
            <li key={`${i}-${t}`}>{t}</li>
          ))}
        </ul>
      </div>

      <div className={`glass-panel ${styles.card}`}>
        <h3>Invoices</h3>
        <div className={styles.stat}>{invoiceAmount}</div>
        <div className={styles.statLabel}>{invoiceLabel}</div>
      </div>

      <div className={`glass-panel ${styles.card}`}>
        <h3>Jurisdiction</h3>
        {jurisdictionTags.map((j) => (
          <div key={j.id} className={styles.tag}>
            {j.name}
          </div>
        ))}
      </div>
    </section>
  );
}
