'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const [lang, setLang] = useState('en');

    useEffect(() => {
        // Load language preference
        const saved = localStorage.getItem('clearance_lang');
        if (saved) {
            setLang(saved);
            document.documentElement.lang = saved;
        }
    }, []);

    const toggleLanguage = () => {
        const newLang = lang === 'en' ? 'es' : 'en'; // Simple toggle for now
        setLang(newLang);
        localStorage.setItem('clearance_lang', newLang);
        document.documentElement.lang = newLang; // Update html tag
    };

    const getLanguageLabel = () => {
        // Minimal display
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
