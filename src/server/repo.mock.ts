import { Repo } from "./repo";
import type {
  Permit,
  Inspection,
  Approval,
  Invoice,
  Jurisdiction,
  AuditLog,
} from "@/types/domain";

const now = () => new Date().toISOString();

const db = {
  permits: [] as Permit[],
  inspections: [] as Inspection[],
  approvals: [] as Approval[],
  invoices: [] as Invoice[],
  jurisdictions: [] as Jurisdiction[],
  audit: [] as AuditLog[],
};

// --- seed (Phase 1 demo data) ---
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

db.approvals.push({
  id: "app_001",
  orgId: "org_demo",
  permitId: "per_003",
  decision: "approved",
  decidedBy: "user_demo_admin",
  notes: "Approved after final inspection.",
  createdAt: seedNow,
});

db.invoices.push({
  id: "inv_001",
  orgId: "org_demo",
  permitId: "per_003",
  status: "open",
  amountCents: 125000,
  issuedAt: seedNow,
});
// --- end seed ---

export const mockRepo: Repo = {
  async listPermits(orgId) {
    return db.permits.filter((p) => p.orgId === orgId);
  },
  async getPermit(orgId, id) {
    return db.permits.find((p) => p.orgId === orgId && p.id === id) ?? null;
  },
  async upsertPermit(orgId, permit) {
    const idx = db.permits.findIndex((p) => p.orgId === orgId && p.id === permit.id);
    const next = { ...permit, orgId, updatedAt: now() };
    if (idx >= 0) db.permits[idx] = next;
    else db.permits.push(next);
    return next;
  },

  async listInspections(orgId) {
    return db.inspections.filter((i) => i.orgId === orgId);
  },
  async upsertInspection(orgId, inspection) {
    const idx = db.inspections.findIndex((i) => i.orgId === orgId && i.id === inspection.id);
    const next = { ...inspection, orgId, updatedAt: now() };
    if (idx >= 0) db.inspections[idx] = next;
    else db.inspections.push(next);
    return next;
  },

  async listApprovals(orgId) {
    return db.approvals.filter((a) => a.orgId === orgId);
  },
  async createApproval(orgId, approval) {
    const next = { ...approval, orgId, createdAt: now() };
    db.approvals.push(next);
    return next;
  },

  async listInvoices(orgId) {
    return db.invoices.filter((inv) => inv.orgId === orgId);
  },
  async upsertInvoice(orgId, invoice) {
    const idx = db.invoices.findIndex((inv) => inv.orgId === orgId && inv.id === invoice.id);
    const next = { ...invoice, orgId };
    if (idx >= 0) db.invoices[idx] = next;
    else db.invoices.push(next);
    return next;
  },

  async listJurisdictions(orgId) {
    return db.jurisdictions.filter((j) => j.orgId === orgId);
  },

  async appendAudit(orgId, log) {
    db.audit.push({ ...log, orgId, createdAt: now() });
  },
};
