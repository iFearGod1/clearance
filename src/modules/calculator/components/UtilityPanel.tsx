'use client';

import React, { useState } from 'react';
import { can, type Role, type Principal } from '@/lib/permissions';
import { evaluateExpression, CALC_DISCLAIMER } from '@/modules/calculator';
import {
    validateLengthMeasurement,
    MEASUREMENT_DISCLAIMER,
    type LengthMeasurement,
    type MeasurementMethod
} from '@/modules/measurement';
import type { LengthUnit, UnitSystem } from '@/types/units';
import type { CalculatorOp } from '@/modules/calculator/types';
import { appendAuditEvent, auditId, isoNow } from '@/lib/audit';
import styles from '@/app/tools/utility/utility.module.css';

export default function UtilityPanel() {
    // Principal
    const [role, setRole] = useState<Role>('contractor');
    const principal: Principal = { userId: 'demo-user', role };

    // Calculator state
    const [calcA, setCalcA] = useState<number>(0);
    const [calcB, setCalcB] = useState<number>(0);
    const [calcOp, setCalcOp] = useState<CalculatorOp>('add');
    const [calcResult, setCalcResult] = useState<number | null>(null);
    const [calcSaved, setCalcSaved] = useState<string | null>(null);

    // Measurement state
    const [measLabel, setMeasLabel] = useState<string>('');
    const [measValue, setMeasValue] = useState<number>(0);
    const [measUnit, setMeasUnit] = useState<LengthUnit>('ft');
    const [measMethod, setMeasMethod] = useState<MeasurementMethod>('manual');
    const [measValidation, setMeasValidation] = useState<{ valid: boolean; message: string } | null>(null);
    const [measSaved, setMeasSaved] = useState<string | null>(null);

    const handleCalculate = () => {
        try {
            const result = evaluateExpression({
                op: calcOp,
                a: { value: calcA },
                b: { value: calcB },
            });
            setCalcResult(result.value);
        } catch (err) {
            setCalcResult(null);
            alert(err instanceof Error ? err.message : 'Calculation error');
        }
    };

    const handleSaveCalculation = () => {
        if (!can(principal, 'calc.save_to_record')) {
            appendAuditEvent({
                id: auditId('calc'),
                type: 'calc.save_to_record',
                at: isoNow(),
                actor: { userId: principal.userId, role: principal.role },
                entity: {
                    kind: 'calculation',
                    label: 'Utility Panel Calculation',
                },
                result: 'denied',
                message: 'Permission denied',
            });
            return;
        }

        const timestamp = new Date().toLocaleString();
        setCalcSaved(timestamp);

        appendAuditEvent({
            id: auditId('calc'),
            type: 'calc.save_to_record',
            at: isoNow(),
            actor: { userId: principal.userId, role: principal.role },
            entity: {
                kind: 'calculation',
                label: 'Utility Panel Calculation',
            },
            meta: {
                operation: calcOp,
                result: calcResult,
            },
            result: 'success',
        });
    };

    const handleValidateMeasurement = () => {
        try {
            const measurement: LengthMeasurement = {
                id: 'temp-id',
                label: measLabel,
                unitSystem: (measUnit === 'ft' || measUnit === 'in') ? 'imperial' : 'metric',
                value: measValue,
                unit: measUnit,
                method: measMethod,
                audit: {
                    createdAt: new Date().toISOString(),
                    createdBy: { userId: 'demo-user' },
                },
            };

            validateLengthMeasurement(measurement);
            setMeasValidation({ valid: true, message: 'Validation passed' });
        } catch (err) {
            setMeasValidation({
                valid: false,
                message: err instanceof Error ? err.message : 'Validation failed'
            });
        }
    };

    const handleSaveMeasurement = () => {
        if (!can(principal, 'measurement.save_to_record')) {
            appendAuditEvent({
                id: auditId('meas'),
                type: 'measurement.save_to_record',
                at: isoNow(),
                actor: { userId: principal.userId, role: principal.role },
                entity: {
                    kind: 'measurement',
                    label: measLabel,
                },
                result: 'denied',
                message: 'Permission denied',
            });
            return;
        }

        const timestamp = new Date().toLocaleString();
        setMeasSaved(timestamp);

        appendAuditEvent({
            id: auditId('meas'),
            type: 'measurement.save_to_record',
            at: isoNow(),
            actor: { userId: principal.userId, role: principal.role },
            entity: {
                kind: 'measurement',
                label: measLabel,
            },
            meta: {
                unit: measUnit,
                value: measValue,
            },
            result: 'success',
        });
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Utility Panel</h1>
                <p>Calculator, Measurement, and Permissions Demo</p>
            </header>

            {/* Role Selector */}
            <div className={`glass-panel ${styles.roleSelector}`}>
                <label htmlFor="role-select">Current Role (Demo)</label>
                <select
                    id="role-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value as Role)}
                >
                    <option value="admin">Admin</option>
                    <option value="inspector">Inspector</option>
                    <option value="contractor">Contractor</option>
                    <option value="finance">Finance</option>
                </select>
            </div>

            {/* Calculator Section */}
            <section className={`glass-panel ${styles.section}`}>
                <h2>Calculator</h2>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="calc-a">Value A</label>
                        <input
                            id="calc-a"
                            type="number"
                            value={calcA}
                            onChange={(e) => setCalcA(parseFloat(e.target.value) || 0)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="calc-b">Value B</label>
                        <input
                            id="calc-b"
                            type="number"
                            value={calcB}
                            onChange={(e) => setCalcB(parseFloat(e.target.value) || 0)}
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="calc-op">Operation</label>
                    <select
                        id="calc-op"
                        value={calcOp}
                        onChange={(e) => setCalcOp(e.target.value as CalculatorOp)}
                    >
                        <option value="add">Add (+)</option>
                        <option value="sub">Subtract (−)</option>
                        <option value="mul">Multiply (×)</option>
                        <option value="div">Divide (÷)</option>
                    </select>
                </div>

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.button}
                        onClick={handleCalculate}
                        disabled={!can(principal, 'calc.use')}
                    >
                        Run Calculation
                    </button>

                    <button
                        className={`${styles.button} ${styles.buttonSecondary}`}
                        onClick={handleSaveCalculation}
                        disabled={!can(principal, 'calc.save_to_record') || calcResult === null}
                    >
                        Save to Record
                    </button>
                </div>

                {calcResult !== null && (
                    <div className={styles.result}>
                        <strong>Result:</strong> {calcResult}
                    </div>
                )}

                {calcSaved && (
                    <div className={styles.feedback}>
                        Saved (stub) at {calcSaved}
                    </div>
                )}

                <div className={styles.disclaimer}>
                    <strong>Disclaimer:</strong> {CALC_DISCLAIMER}
                </div>
            </section>

            {/* Measurement Section */}
            <section className={`glass-panel ${styles.section}`}>
                <h2>Measurement</h2>

                <div className={styles.formGroup}>
                    <label htmlFor="meas-label">Label</label>
                    <input
                        id="meas-label"
                        type="text"
                        value={measLabel}
                        onChange={(e) => setMeasLabel(e.target.value)}
                        placeholder="e.g., Foundation Width"
                    />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="meas-value">Value</label>
                        <input
                            id="meas-value"
                            type="number"
                            value={measValue}
                            onChange={(e) => setMeasValue(parseFloat(e.target.value) || 0)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="meas-unit">Unit</label>
                        <select
                            id="meas-unit"
                            value={measUnit}
                            onChange={(e) => setMeasUnit(e.target.value as LengthUnit)}
                        >
                            <option value="ft">Feet (ft)</option>
                            <option value="in">Inches (in)</option>
                            <option value="m">Meters (m)</option>
                            <option value="cm">Centimeters (cm)</option>
                            <option value="mm">Millimeters (mm)</option>
                        </select>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="meas-method">Method</label>
                    <select
                        id="meas-method"
                        value={measMethod}
                        onChange={(e) => setMeasMethod(e.target.value as MeasurementMethod)}
                    >
                        <option value="manual">Manual</option>
                        <option value="ar_assist">AR Assist</option>
                        <option value="photo_reference">Photo Reference</option>
                        <option value="device_sensor">Device Sensor</option>
                    </select>
                </div>

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.button}
                        onClick={handleValidateMeasurement}
                        disabled={!can(principal, 'measurement.capture')}
                    >
                        Validate Measurement
                    </button>

                    <button
                        className={`${styles.button} ${styles.buttonSecondary}`}
                        onClick={handleSaveMeasurement}
                        disabled={!can(principal, 'measurement.save_to_record') || !measValidation?.valid}
                    >
                        Save to Record
                    </button>
                </div>

                {measValidation && (
                    <div className={`${styles.result} ${measValidation.valid ? styles.success : styles.error}`}>
                        <strong>{measValidation.valid ? 'Valid:' : 'Error:'}</strong> {measValidation.message}
                    </div>
                )}

                {measSaved && (
                    <div className={styles.feedback}>
                        Saved (stub) at {measSaved}
                    </div>
                )}

                <div className={styles.disclaimer}>
                    <strong>Disclaimer:</strong> {MEASUREMENT_DISCLAIMER}
                </div>
            </section>
        </div>
    );
}
