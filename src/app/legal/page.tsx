import React from 'react';
import styles from './legal.module.css';

export default function LegalPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Legal & Compliance</h1>
                <p>Version 2.4 — Updated Oct 2026</p>
            </header>

            <section className={`${styles.card} glass-panel`}>
                <h2>Privacy Policy</h2>
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

            <section className={`${styles.card} glass-panel`}>
                <h2>Terms of Service</h2>
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

            <section className={`${styles.card} glass-panel`}>
                <h2>Language Availability</h2>
                <div className={styles.content}>
                    <p>
                        To ensure compliance and safety, all critical legal documents and audit trails are maintained in their original language.
                        Automated translations are provided for user convenience only and do not constitute a binding legal agreement.
                    </p>
                </div>
            </section>
        </div>
    );
}
