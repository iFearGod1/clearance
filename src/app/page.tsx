import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1 className={styles.title}>clearance</h1>
        <p className={styles.subtitle}>Enterprise Compliance Command Center</p>
      </header>

      <section className={styles.dashboardGrid}>
        <div className={`glass-panel ${styles.card} ${styles.large}`}>
          <h3>Permit Approvals</h3>
          <div className={styles.placeholderChart}></div>
        </div>

        <div className={`glass-panel ${styles.card}`}>
          <h3>Inspections</h3>
          <ul className={styles.list}>
            <li>Site A: Scheduled 14:00</li>
            <li>Site B: Pending Review</li>
          </ul>
        </div>

        <div className={`glass-panel ${styles.card}`}>
          <h3>Invoices</h3>
          <div className={styles.stat}>$12,450</div>
          <div className={styles.statLabel}>Pending</div>
        </div>

        <div className={`glass-panel ${styles.card}`}>
          <h3>Jurisdiction</h3>
          <div className={styles.tag}>San Francisco</div>
          <div className={styles.tag}>Alameda</div>
        </div>
      </section>
    </div>
  );
}
