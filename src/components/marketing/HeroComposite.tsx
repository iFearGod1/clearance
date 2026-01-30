'use client';

import React, { useState } from 'react';
import UtilityPanel from '@/modules/calculator/components/UtilityPanel';
import styles from './HeroComposite.module.css';

interface HeroCompositeProps {
    dashboard: React.ReactNode;
}

export default function HeroComposite({ dashboard }: HeroCompositeProps) {
    const [enableVideo] = useState(() => {
        if (typeof window === 'undefined') return false;

        const prefersReduced =
            window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

        const connection = (
            navigator as Navigator & {
                connection?: {
                    saveData?: boolean;
                    effectiveType?: string;
                };
            }
        ).connection;

        const saveData = connection?.saveData ?? false;
        const effectiveType = connection?.effectiveType ?? '';
        const slowConnection =
            effectiveType === '2g' || effectiveType === 'slow-2g';

        return !prefersReduced && !saveData && !slowConnection;
    });

    return (
        <div className={styles.wrap}>
            <div className={styles.stage}>
                <div className={styles.background} aria-hidden="true">
                    {enableVideo ? (
                        <video
                            className={styles.backgroundMedia}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            poster="/media/clearance-hero-poster.png"
                            autoPlay
                        >
                            <source src="/media/clearance-hero.mp4" type="video/mp4" />
                        </video>
                    ) : (
                        <img
                            className={styles.backgroundMedia}
                            src="/media/clearance-hero-poster.png"
                            alt=""
                        />
                    )}
                    <div className={styles.backgroundOverlay} />
                </div>

                <div className={styles.content}>
                    {/* Laptop Frame */}
                    <div className={styles.laptop}>
                        <div className={styles.laptopHeader}>
                            <span className={styles.laptopBrand}>clearance</span>
                        </div>
                        <div className={styles.laptopScreen}>
                            {dashboard}
                        </div>
                    </div>

                    {/* Phone Frame */}
                    <div className={styles.phone}>
                        <div className={styles.phoneNotch}></div>
                        <div className={styles.phoneScreen}>
                            <UtilityPanel />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
