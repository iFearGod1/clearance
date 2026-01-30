'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const [lang, setLang] = useState(() => {
        if (typeof window === 'undefined') return 'en';

        const saved = localStorage.getItem('clearance_lang');
        if (saved) {
            document.documentElement.lang = saved;
            return saved;
        }

        return 'en';
    });

    const toggleLanguage = () => {
        const newLang = lang === 'en' ? 'es' : 'en';
        setLang(newLang);
        localStorage.setItem('clearance_lang', newLang);
        document.documentElement.lang = newLang;
    };

    const getLanguageLabel = () => {
        return lang === 'en' ? 'English' : 'Español';
    };

    return (
        <footer className={styles.footer}>
            <Link href="/legal/privacy" className={styles.link}>
                Privacy
            </Link>
            <span className={styles.separator}>·</span>

            <Link href="/legal/terms" className={styles.link}>
                Terms
            </Link>
            <span className={styles.separator}>·</span>

            <button
                className={`${styles.link} ${styles.languageButton}`}
                type="button"
                onClick={toggleLanguage}
                title="Change Language"
            >
                Language: {getLanguageLabel()}
            </button>
            <span className={styles.separator}>·</span>

            <span className={styles.copyright}>
                Copyright © 2026 clearance
            </span>
        </footer>
    );
}
