'use client';

import React, { useEffect, useState } from 'react';
import UtilityPanel from '@/modules/calculator/components/UtilityPanel';
import styles from './HeroComposite.module.css';

interface HeroCompositeProps {
    dashboard: React.ReactNode;
}

export default function HeroComposite({ dashboard }: HeroCompositeProps) {
    // IMPORTANT: must start false so SSR and first client render match (<img>).
    const [enableVideo, setEnableVideo] = useState(false);

    useEffect(() => {
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
        const slowConnection = effectiveType === '2g' || effectiveType === 'slow-2g';

        setEnableVideo(!prefersReduced && !saveData && !slowConnection);
    }, []);

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
                            preload="auto"
                            poster="/media/clearance-hero-v1.png"
                            autoPlay
                            onCanPlay={(e) => {
                                const v = e.currentTarget;
                                if (v.paused) v.play().catch(() => { });
                            }}
                        >
                            <source src="/media/clearance-hero.mp4" type="video/mp4" />
                        </video>
                    ) : (
                        <img
                            className={styles.backgroundMedia}
                            src="/media/clearance-hero-v1.png"
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
                        <div className={styles.laptopScreen}>{dashboard}</div>
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
