import type { RepoProvider } from "./types";
import type {
    Permit,
    Inspection,
    Invoice,
    Jurisdiction,
    AuditLog,
    ID,
} from "@/types/domain";

const now = () => new Date().toISOString();

const db = {
    permits: [] as Permit[],
    inspections: [] as Inspection[],
    invoices: [] as Invoice[],
    jurisdictions: [] as Jurisdiction[],
    audit: [] as AuditLog[],
};

// --- seed (demo data) ---
const seedNow = now();

db.jurisdictions.push(
    { id: "jur_nyc_dob", orgId: "org_demo", name: "NYC DOB", regionCode: "NYC", createdAt: seedNow },
    { id: "jur_la_city", orgId: "org_demo", name: "LA City", regionCode: "LA", createdAt: seedNow },
    { id: "jur_miami", orgId: "org_demo", name: "Miami-Dade", regionCode: "MIA", createdAt: seedNow }
);

db.permits.push(
    {
        id: "per_001",
        orgId: "org_demo",
        jurisdictionId: "jur_nyc_dob",
        title: "Tenant Improvement — 5th Floor",
        status: "in_review",
        createdBy: "user_demo_admin",
        assignedTo: "user_demo_admin",
        createdAt: seedNow,
        updatedAt: seedNow,
    },
    {
        id: "per_002",
        orgId: "org_demo",
        jurisdictionId: "jur_la_city",
        title: "Electrical Upgrade — Panel Replacement",
        status: "submitted",
        createdBy: "user_demo_admin",
        assignedTo: "user_demo_admin",
        createdAt: seedNow,
        updatedAt: seedNow,
    },
    {
        id: "per_003",
        orgId: "org_demo",
        jurisdictionId: "jur_miami",
        title: "Signage Permit — Exterior",
        status: "approved",
        createdBy: "user_demo_admin",
        assignedTo: "user_demo_admin",
        createdAt: seedNow,
        updatedAt: seedNow,
    }
);

db.inspections.push(
    {
        id: "ins_001",
        orgId: "org_demo",
        permitId: "per_001",
        jurisdictionId: "jur_nyc_dob",
        status: "scheduled",
        scheduledFor: new Date(Date.now() + 86400000).toISOString(),
        assignedInspector: "user_demo_admin",
        resultsSummary: "",
        createdAt: seedNow,
        updatedAt: seedNow,
    },
    {
        id: "ins_002",
        orgId: "org_demo",
        permitId: "per_003",
        jurisdictionId: "jur_miami",
        status: "complete",
        scheduledFor: new Date(Date.now() - 3 * 86400000).toISOString(),
        assignedInspector: "user_demo_admin",
        resultsSummary: "Passed with minor notes.",
        createdAt: seedNow,
        updatedAt: seedNow,
    }
);

db.invoices.push({
    id: "inv_001",
    orgId: "org_demo",
    permitId: "per_003",
    status: "open",
    amountCents: 125000,
    issuedAt: seedNow,
});
// --- end seed ---

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
