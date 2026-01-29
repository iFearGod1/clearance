"use client";

import Link from "next/link";
import { usePermits } from "@/lib/usePermits";
import styles from "./page.module.css";

export default function PermitsPage() {
  const { permits, loading } = usePermits();

  const rows = loading
    ? [
        { id: "loading-1", title: "Loading…", status: "" },
        { id: "loading-2", title: "Loading…", status: "" },
        { id: "loading-3", title: "Loading…", status: "" },
      ]
    : permits;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.backLink} href="/">
          ← Back to Home
        </Link>
        <h1 className={styles.title}>Permits</h1>
        <p className={styles.subtitle}>All permits in org_demo</p>
      </header>

      <div className={`glass-panel ${styles.panel}`}>
        <div className={styles.table}>
          <div className={`${styles.row} ${styles.headRow}`}>
            <div className={styles.cell}>Title</div>
            <div className={styles.cell}>Status</div>
          </div>

          {!loading && permits.length === 0 ? (
            <div className={styles.empty}>No permits yet.</div>
          ) : (
            rows.map((permit) => (
              <div key={permit.id} className={styles.row}>
                <div className={styles.cell}>{permit.title}</div>
                <div className={styles.cell}>{permit.status}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
