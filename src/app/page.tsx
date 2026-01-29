import Link from "next/link";
import HeroComposite from "@/components/marketing/HeroComposite";
import DashboardCardsClient from "@/components/dashboard/DashboardCardsClient";
import styles from "./page.module.css";

export default function Home() {
  const dashboardContent = (
    <>
      <header className={styles.hero}>
        <h1 className={styles.title}>clearance</h1>
        <p className={styles.subtitle}>Enterprise Compliance Command Center</p>
        <Link
          href="/tools/utility"
          style={{
            color: "var(--muted)",
            fontSize: "0.9rem",
            marginTop: "0.5rem",
            display: "inline-block",
          }}
        >
          → Utility Panel
        </Link>
      </header>

      {/* Dashboard cards are now data-backed */}
      <DashboardCardsClient styles={styles} />
    </>
  );

  return (
    <div className={styles.page}>
      <HeroComposite dashboard={dashboardContent} />
    </div>
  );
}
