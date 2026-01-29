
import Link from "next/link";
import React from 'react';
import styles from '../legal.module.css';

export default function PrivacyPage() {
    return (
        <div className={styles.container}>
            <Link href="/" className={styles.backLink}>
                ← Back to Dashboard
            </Link>
            <header className={styles.header}>
                <h1>Privacy Policy</h1>
                <p>Version 2.4 — Updated Oct 2026</p>
            </header>

            <section className={`${styles.card} glass-panel`}>
                <div className={styles.content}>
                    <p>
                        At Clearance, we take your privacy seriously. This policy describes how Clearance collects, uses, and shares your personal information.
                        All data handling processes are compliant with global enterprise standards including GDPR, CCPA, and FedRAMP.
                    </p>
                    <p>
                        We collect information to provide better services to all our users — from figuring out basic stuff like which language you speak, to more complex things like which ads you’ll find most useful, the people who matter most to you online, or which YouTube videos you might like.
                    </p>
                </div>
            </section>
        </div>
    );
}
