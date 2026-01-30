/**
 * Domain label helpers.
 * Centralized display labels for domain enums/statuses.
 */

import type { PermitStatus, InspectionStatus, InvoiceStatus } from "@/types/domain";

// --- Permit Status Labels ---
export const PERMIT_STATUS_LABELS: Record<PermitStatus, string> = {
    draft: "Draft",
    submitted: "Submitted",
    in_review: "In Review",
    approved: "Approved",
    denied: "Denied",
    active: "Active",
    closed: "Closed",
};

export function getPermitStatusLabel(status: PermitStatus): string {
    return PERMIT_STATUS_LABELS[status] ?? status;
}

// --- Inspection Status Labels ---
export const INSPECTION_STATUS_LABELS: Record<InspectionStatus, string> = {
    scheduled: "Scheduled",
    in_progress: "In Progress",
    complete: "Complete",
    canceled: "Canceled",
};

export function getInspectionStatusLabel(status: InspectionStatus): string {
    return INSPECTION_STATUS_LABELS[status] ?? status;
}

// --- Invoice Status Labels ---
export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
    open: "Open",
    paid: "Paid",
    void: "Void",
};

export function getInvoiceStatusLabel(status: InvoiceStatus): string {
    return INVOICE_STATUS_LABELS[status] ?? status;
}

// --- Jurisdiction Tags ---
export type JurisdictionTag = "city" | "county" | "state" | "fire" | "health" | "zoning";

export const JURISDICTION_TAG_LABELS: Record<JurisdictionTag, string> = {
    city: "City",
    county: "County",
    state: "State",
    fire: "Fire",
    health: "Health",
    zoning: "Zoning",
};

// --- Status validation helpers ---
export const PERMIT_STATUSES: readonly PermitStatus[] = [
    "draft",
    "submitted",
    "in_review",
    "approved",
    "denied",
    "active",
    "closed",
];

export const INSPECTION_STATUSES: readonly InspectionStatus[] = [
    "scheduled",
    "in_progress",
    "complete",
    "canceled",
];

export const INVOICE_STATUSES: readonly InvoiceStatus[] = ["open", "paid", "void"];

export function isValidPermitStatus(status: string): status is PermitStatus {
    return PERMIT_STATUSES.includes(status as PermitStatus);
}

export function isValidInspectionStatus(status: string): status is InspectionStatus {
    return INSPECTION_STATUSES.includes(status as InspectionStatus);
}

export function isValidInvoiceStatus(status: string): status is InvoiceStatus {
    return INVOICE_STATUSES.includes(status as InvoiceStatus);
}
