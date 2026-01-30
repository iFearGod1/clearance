import type { Permit, Inspection, Invoice, Jurisdiction, AuditLog, ID } from "@/types/domain";

/**
 * Provider interface for repo data operations.
 * All providers (mock, neon, etc.) must implement this interface.
 */
export interface RepoProvider {
    /** Provider identifier for debugging */
    readonly providerId: string;

    // Permits
    listPermits(orgId: ID): Promise<Permit[]>;
    getPermit(orgId: ID, id: ID): Promise<Permit | null>;
    upsertPermit(orgId: ID, permit: Permit): Promise<Permit>;

    // Inspections
    listInspections(orgId: ID): Promise<Inspection[]>;

    // Invoices
    listInvoices(orgId: ID): Promise<Invoice[]>;

    // Jurisdictions
    listJurisdictions(orgId: ID): Promise<Jurisdiction[]>;

    // Audit
    appendAudit(orgId: ID, log: AuditLog): Promise<void>;
}
