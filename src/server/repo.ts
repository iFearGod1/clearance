import { Permit, Inspection, Approval, Invoice, Jurisdiction, AuditLog, ID } from "@/types/domain";

export interface Repo {
  listPermits(orgId: ID): Promise<Permit[]>;
  getPermit(orgId: ID, id: ID): Promise<Permit | null>;
  upsertPermit(orgId: ID, permit: Permit): Promise<Permit>;

  listInspections(orgId: ID): Promise<Inspection[]>;
  upsertInspection(orgId: ID, inspection: Inspection): Promise<Inspection>;

  listApprovals(orgId: ID): Promise<Approval[]>;
  createApproval(orgId: ID, approval: Approval): Promise<Approval>;

  listInvoices(orgId: ID): Promise<Invoice[]>;
  upsertInvoice(orgId: ID, invoice: Invoice): Promise<Invoice>;

  listJurisdictions(orgId: ID): Promise<Jurisdiction[]>;

  appendAudit(orgId: ID, log: AuditLog): Promise<void>;
}
