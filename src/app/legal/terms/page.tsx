
import React from 'react';
import styles from '../legal.module.css';

export default function TermsPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Terms of Service</h1>
                <p>Version 2.4 — Updated Oct 2026</p>
            </header>

            <section className={`${styles.card} glass-panel`}>
                <div className={styles.content}>
                    <p>
                        By using Clearance, you agree to these terms. Please read them carefully.
                        Our Services are very diverse, so sometimes additional terms or product requirements (including age requirements) may apply.
                    </p>
                    <p>
                        We provide our Services using a commercially reasonable level of skill and care and we hope that you will enjoy using them. But there are certain things that we don’t promise about our Services.
                    </p>
                    <div className={styles.disclaimer}>
                        <strong>Measurement & Calculator Disclaimer:</strong> Measurements and calculations are assistive tools. Final compliance determinations remain with the governing authority unless explicitly accepted by the jurisdiction.
                    </div>
                </div>
            </section>
        </div>
    );
}
