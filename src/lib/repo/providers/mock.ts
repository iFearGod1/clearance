import type { RepoProvider } from "./types";
import type {
    Permit,
    Inspection,
    Invoice,
    Jurisdiction,
    AuditLog,
    ID,
    PermitStatus,
    InspectionStatus,
    InvoiceStatus,
} from "@/types/domain";

const now = () => new Date().toISOString();

// Fixed seed date for deterministic data
const SEED_DATE = "2026-01-15T12:00:00.000Z";

// --- org_demo dataset (repo_mock) ---
const demoJurisdictions: Jurisdiction[] = [
    { id: "jur_nyc_dob", orgId: "org_demo", name: "NYC DOB", regionCode: "NYC", createdAt: SEED_DATE },
    { id: "jur_la_city", orgId: "org_demo", name: "LA City", regionCode: "LA", createdAt: SEED_DATE },
    { id: "jur_miami", orgId: "org_demo", name: "Miami-Dade", regionCode: "MIA", createdAt: SEED_DATE },
    { id: "jur_chicago", orgId: "org_demo", name: "Chicago DOB", regionCode: "CHI", createdAt: SEED_DATE },
    { id: "jur_sf_fire", orgId: "org_demo", name: "SF Fire Dept", regionCode: "SF", createdAt: SEED_DATE },
    { id: "jur_houston", orgId: "org_demo", name: "Houston PWE", regionCode: "HOU", createdAt: SEED_DATE },
];

const demoPermits: Permit[] = [
    {
        id: "per_001", orgId: "org_demo", jurisdictionId: "jur_nyc_dob",
        title: "Tenant Improvement — 5th Floor", status: "in_review" as PermitStatus,
        createdBy: "user_demo_admin", assignedTo: "user_demo_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_002", orgId: "org_demo", jurisdictionId: "jur_la_city",
        title: "Electrical Upgrade — Panel Replacement", status: "submitted" as PermitStatus,
        createdBy: "user_demo_admin", assignedTo: "user_demo_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_003", orgId: "org_demo", jurisdictionId: "jur_miami",
        title: "Signage Permit — Exterior", status: "approved" as PermitStatus,
        createdBy: "user_demo_admin", assignedTo: "user_demo_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_004", orgId: "org_demo", jurisdictionId: "jur_chicago",
        title: "HVAC System Replacement", status: "draft" as PermitStatus,
        createdBy: "user_demo_admin", assignedTo: "user_demo_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_005", orgId: "org_demo", jurisdictionId: "jur_sf_fire",
        title: "Fire Alarm Installation — Warehouse", status: "denied" as PermitStatus,
        createdBy: "user_demo_admin", assignedTo: "user_demo_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_006", orgId: "org_demo", jurisdictionId: "jur_houston",
        title: "Plumbing Retrofit — Building B", status: "active" as PermitStatus,
        createdBy: "user_demo_admin", assignedTo: "user_demo_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_007", orgId: "org_demo", jurisdictionId: "jur_nyc_dob",
        title: "Foundation Repair — East Wing", status: "in_review" as PermitStatus,
        createdBy: "user_demo_admin", assignedTo: "user_demo_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_008", orgId: "org_demo", jurisdictionId: "jur_la_city",
        title: "Rooftop Solar Array", status: "submitted" as PermitStatus,
        createdBy: "user_demo_admin", assignedTo: "user_demo_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_009", orgId: "org_demo", jurisdictionId: "jur_miami",
        title: "Window Replacement — All Floors", status: "closed" as PermitStatus,
        createdBy: "user_demo_admin", assignedTo: "user_demo_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_010", orgId: "org_demo", jurisdictionId: "jur_chicago",
        title: "Emergency Exit Signage Update", status: "approved" as PermitStatus,
        createdBy: "user_demo_admin", assignedTo: "user_demo_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
];

const demoInspections: Inspection[] = [
    {
        id: "ins_001", orgId: "org_demo", permitId: "per_001", jurisdictionId: "jur_nyc_dob",
        status: "scheduled" as InspectionStatus, scheduledFor: "2026-01-20T09:00:00.000Z",
        assignedInspector: "user_demo_admin", resultsSummary: "",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "ins_002", orgId: "org_demo", permitId: "per_003", jurisdictionId: "jur_miami",
        status: "complete" as InspectionStatus, scheduledFor: "2026-01-10T14:00:00.000Z",
        assignedInspector: "user_demo_admin", resultsSummary: "Passed with minor notes.",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "ins_003", orgId: "org_demo", permitId: "per_006", jurisdictionId: "jur_houston",
        status: "in_progress" as InspectionStatus, scheduledFor: "2026-01-15T10:00:00.000Z",
        assignedInspector: "user_demo_admin", resultsSummary: "",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
];

const demoInvoices: Invoice[] = [
    { id: "inv_001", orgId: "org_demo", permitId: "per_003", status: "open" as InvoiceStatus, amountCents: 125000, issuedAt: SEED_DATE },
    { id: "inv_002", orgId: "org_demo", permitId: "per_006", status: "paid" as InvoiceStatus, amountCents: 75000, issuedAt: SEED_DATE, paidAt: "2026-01-16T00:00:00.000Z" },
    { id: "inv_003", orgId: "org_demo", permitId: "per_010", status: "open" as InvoiceStatus, amountCents: 45000, issuedAt: SEED_DATE },
    { id: "inv_004", orgId: "org_demo", permitId: "per_009", status: "void" as InvoiceStatus, amountCents: 32000, issuedAt: SEED_DATE },
    { id: "inv_005", orgId: "org_demo", permitId: "per_001", status: "open" as InvoiceStatus, amountCents: 87500, issuedAt: SEED_DATE },
    { id: "inv_006", orgId: "org_demo", permitId: "per_007", status: "paid" as InvoiceStatus, amountCents: 230000, issuedAt: SEED_DATE, paidAt: "2026-01-18T00:00:00.000Z" },
];

// --- org_sandbox dataset (repo_sandbox) ---
const sandboxJurisdictions: Jurisdiction[] = [
    { id: "jur_denver", orgId: "org_sandbox", name: "Denver B&S", regionCode: "DEN", createdAt: SEED_DATE },
    { id: "jur_seattle", orgId: "org_sandbox", name: "Seattle DCI", regionCode: "SEA", createdAt: SEED_DATE },
    { id: "jur_boston", orgId: "org_sandbox", name: "Boston ISD", regionCode: "BOS", createdAt: SEED_DATE },
    { id: "jur_phoenix", orgId: "org_sandbox", name: "Phoenix DevSvcs", regionCode: "PHX", createdAt: SEED_DATE },
    { id: "jur_portland", orgId: "org_sandbox", name: "Portland BDS", regionCode: "PDX", createdAt: SEED_DATE },
    { id: "jur_austin", orgId: "org_sandbox", name: "Austin DSD", regionCode: "AUS", createdAt: SEED_DATE },
    { id: "jur_raleigh", orgId: "org_sandbox", name: "Raleigh Inspections", regionCode: "RAL", createdAt: SEED_DATE },
    { id: "jur_nashville", orgId: "org_sandbox", name: "Nashville Codes", regionCode: "NSH", createdAt: SEED_DATE },
];

const sandboxPermits: Permit[] = [
    {
        id: "per_sb_001", orgId: "org_sandbox", jurisdictionId: "jur_denver",
        title: "Office Renovation — Downtown Tower", status: "approved" as PermitStatus,
        createdBy: "user_sandbox_admin", assignedTo: "user_sandbox_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_sb_002", orgId: "org_sandbox", jurisdictionId: "jur_seattle",
        title: "New Construction — Mixed Use Building", status: "in_review" as PermitStatus,
        createdBy: "user_sandbox_admin", assignedTo: "user_sandbox_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_sb_003", orgId: "org_sandbox", jurisdictionId: "jur_boston",
        title: "Historic Facade Restoration", status: "submitted" as PermitStatus,
        createdBy: "user_sandbox_admin", assignedTo: "user_sandbox_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_sb_004", orgId: "org_sandbox", jurisdictionId: "jur_phoenix",
        title: "Solar Panel Array — Commercial", status: "active" as PermitStatus,
        createdBy: "user_sandbox_admin", assignedTo: "user_sandbox_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_sb_005", orgId: "org_sandbox", jurisdictionId: "jur_portland",
        title: "Seismic Retrofit — Warehouse District", status: "draft" as PermitStatus,
        createdBy: "user_sandbox_admin", assignedTo: "user_sandbox_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_sb_006", orgId: "org_sandbox", jurisdictionId: "jur_austin",
        title: "Food Truck Court Permits", status: "approved" as PermitStatus,
        createdBy: "user_sandbox_admin", assignedTo: "user_sandbox_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_sb_007", orgId: "org_sandbox", jurisdictionId: "jur_raleigh",
        title: "Data Center Expansion", status: "in_review" as PermitStatus,
        createdBy: "user_sandbox_admin", assignedTo: "user_sandbox_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_sb_008", orgId: "org_sandbox", jurisdictionId: "jur_nashville",
        title: "Event Venue Fire Safety Upgrade", status: "denied" as PermitStatus,
        createdBy: "user_sandbox_admin", assignedTo: "user_sandbox_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_sb_009", orgId: "org_sandbox", jurisdictionId: "jur_denver",
        title: "Parking Garage Structural Repair", status: "submitted" as PermitStatus,
        createdBy: "user_sandbox_admin", assignedTo: "user_sandbox_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_sb_010", orgId: "org_sandbox", jurisdictionId: "jur_seattle",
        title: "ADA Accessibility Improvements", status: "approved" as PermitStatus,
        createdBy: "user_sandbox_admin", assignedTo: "user_sandbox_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_sb_011", orgId: "org_sandbox", jurisdictionId: "jur_boston",
        title: "Elevator Modernization", status: "closed" as PermitStatus,
        createdBy: "user_sandbox_admin", assignedTo: "user_sandbox_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "per_sb_012", orgId: "org_sandbox", jurisdictionId: "jur_phoenix",
        title: "Water Reclamation System", status: "in_review" as PermitStatus,
        createdBy: "user_sandbox_admin", assignedTo: "user_sandbox_admin",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
];

const sandboxInspections: Inspection[] = [
    {
        id: "ins_sb_001", orgId: "org_sandbox", permitId: "per_sb_001", jurisdictionId: "jur_denver",
        status: "complete" as InspectionStatus, scheduledFor: "2026-01-12T09:00:00.000Z",
        assignedInspector: "user_sandbox_inspector", resultsSummary: "All items passed.",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "ins_sb_002", orgId: "org_sandbox", permitId: "per_sb_002", jurisdictionId: "jur_seattle",
        status: "scheduled" as InspectionStatus, scheduledFor: "2026-01-22T14:00:00.000Z",
        assignedInspector: "user_sandbox_inspector", resultsSummary: "",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "ins_sb_003", orgId: "org_sandbox", permitId: "per_sb_004", jurisdictionId: "jur_phoenix",
        status: "complete" as InspectionStatus, scheduledFor: "2026-01-08T10:00:00.000Z",
        assignedInspector: "user_sandbox_inspector", resultsSummary: "Passed with conditions.",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
    {
        id: "ins_sb_004", orgId: "org_sandbox", permitId: "per_sb_007", jurisdictionId: "jur_raleigh",
        status: "scheduled" as InspectionStatus, scheduledFor: "2026-01-25T11:00:00.000Z",
        assignedInspector: "user_sandbox_inspector", resultsSummary: "",
        createdAt: SEED_DATE, updatedAt: SEED_DATE,
    },
];

const sandboxInvoices: Invoice[] = [
    { id: "inv_sb_001", orgId: "org_sandbox", permitId: "per_sb_001", status: "paid" as InvoiceStatus, amountCents: 185000, issuedAt: SEED_DATE, paidAt: "2026-01-14T00:00:00.000Z" },
    { id: "inv_sb_002", orgId: "org_sandbox", permitId: "per_sb_002", status: "open" as InvoiceStatus, amountCents: 450000, issuedAt: SEED_DATE },
    { id: "inv_sb_003", orgId: "org_sandbox", permitId: "per_sb_004", status: "paid" as InvoiceStatus, amountCents: 95000, issuedAt: SEED_DATE, paidAt: "2026-01-10T00:00:00.000Z" },
    { id: "inv_sb_004", orgId: "org_sandbox", permitId: "per_sb_006", status: "open" as InvoiceStatus, amountCents: 28000, issuedAt: SEED_DATE },
    { id: "inv_sb_005", orgId: "org_sandbox", permitId: "per_sb_010", status: "paid" as InvoiceStatus, amountCents: 67000, issuedAt: SEED_DATE, paidAt: "2026-01-17T00:00:00.000Z" },
    { id: "inv_sb_006", orgId: "org_sandbox", permitId: "per_sb_011", status: "void" as InvoiceStatus, amountCents: 120000, issuedAt: SEED_DATE },
    { id: "inv_sb_007", orgId: "org_sandbox", permitId: "per_sb_007", status: "open" as InvoiceStatus, amountCents: 340000, issuedAt: SEED_DATE },
];

// --- Combined in-memory database ---
const db = {
    permits: [...demoPermits, ...sandboxPermits] as Permit[],
    inspections: [...demoInspections, ...sandboxInspections] as Inspection[],
    invoices: [...demoInvoices, ...sandboxInvoices] as Invoice[],
    jurisdictions: [...demoJurisdictions, ...sandboxJurisdictions] as Jurisdiction[],
    audit: [] as AuditLog[],
};

export const mockProvider: RepoProvider = {
    providerId: "mock",

    async listPermits(orgId: ID) {
        return db.permits.filter((p) => p.orgId === orgId);
    },

    async getPermit(orgId: ID, id: ID) {
        return db.permits.find((p) => p.orgId === orgId && p.id === id) ?? null;
    },

    async upsertPermit(orgId: ID, permit: Permit) {
        const idx = db.permits.findIndex((p) => p.orgId === orgId && p.id === permit.id);
        const next = { ...permit, orgId, updatedAt: now() };
        if (idx >= 0) db.permits[idx] = next;
        else db.permits.push(next);
        return next;
    },

    async listInspections(orgId: ID) {
        return db.inspections.filter((i) => i.orgId === orgId);
    },

    async listInvoices(orgId: ID) {
        return db.invoices.filter((inv) => inv.orgId === orgId);
    },

    async listJurisdictions(orgId: ID) {
        return db.jurisdictions.filter((j) => j.orgId === orgId);
    },

    async appendAudit(orgId: ID, log: AuditLog) {
        db.audit.push({ ...log, orgId, createdAt: now() });
    },
};
