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

db.approvals.push(
  {
    id: "app_001",
    orgId: "org_demo",
    permitId: "per_003",
    decision: "approved",
    decidedBy: "user_demo_admin",
    notes: "Approved after final inspection.",
    createdAt: seedNow,
  }
);

db.invoices.push(
  {
    id: "inv_001",
    orgId: "org_demo",
    permitId: "per_003",
    status: "open",
    amountCents: 125000,
    issuedAt: seedNow,
  }
);
// --- end seed ---
