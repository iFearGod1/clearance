'use client';

import React from 'react';
import UtilityPanel from '@/modules/calculator/components/UtilityPanel';
import styles from './HeroComposite.module.css';

interface HeroCompositeProps {
    dashboard: React.ReactNode;
}

export default function HeroComposite({ dashboard }: HeroCompositeProps) {
    return (
        <div className={styles.wrap}>
            <div className={styles.stage}>
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
    );
}
