"use client";

import { useDashboardSummary } from "@/lib/useDashboardSummary";

function money(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export default function DashboardCardsClient({ styles }: { styles: Record<string, string> }) {
  const { summary, loading } = useDashboardSummary();

  // Keep placeholders stable (no layout shifts)
  const inspections = loading ? ["Loading…", "Loading…"] : [
    `Scheduled: ${summary?.inspections.scheduled ?? 0}`,
    `Complete: ${summary?.inspections.complete ?? 0}`,
  ];

  const invoiceAmount = loading ? "—" : money(summary?.invoices.openAmountCents ?? 0);
  const invoiceLabel = loading ? "Loading" : `Open (${summary?.invoices.open ?? 0})`;

  const jurisdictionTags = ["NYC DOB", "LA City", "Miami-Dade"]; // Phase 1 static; we can wire later

  return (
    <section className={styles.dashboardGrid}>
      <div className={`glass-panel ${styles.card} ${styles.large}`}>
        <h3>Permit Approvals</h3>
        <div className={styles.placeholderChart}></div>
      </div>

      <div className={`glass-panel ${styles.card}`}>
        <h3>Inspections</h3>
        <ul className={styles.list}>
          {inspections.map((t) => (
            <li key={t}>{t}</li>
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
          <div key={j} className={styles.tag}>{j}</div>
        ))}
      </div>
    </section>
  );
}
