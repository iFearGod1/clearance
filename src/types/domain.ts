export type ID = string;

export type PermitStatus =
  | "draft"
  | "submitted"
  | "in_review"
  | "approved"
  | "denied"
  | "active"
  | "closed";

export type InspectionStatus =
  | "scheduled"
  | "in_progress"
  | "complete"
  | "canceled";

export type ApprovalDecision = "approved" | "denied";
export type InvoiceStatus = "open" | "paid" | "void";

export type Role =
  | "admin"
  | "compliance_manager"
  | "inspector"
  | "finance"
  | "viewer";

/* =========================
   Core Entities
   ========================= */

export interface Organization {
  id: ID;
  name: string;
  createdAt: string;
}

export interface User {
  id: ID;
  orgId: ID;
  name: string;
  email: string;
  roles: Role[];
  createdAt: string;
}

export interface Jurisdiction {
  id: ID;
  orgId: ID;
  name: string;
  regionCode?: string;
  createdAt: string;
}

export interface Permit {
  id: ID;
  orgId: ID;
  jurisdictionId: ID;
  title: string;
  status: PermitStatus;
  createdBy: ID;
  assignedTo?: ID;
  createdAt: string;
  updatedAt: string;
}

export interface Inspection {
  id: ID;
  orgId: ID;
  permitId: ID;
  jurisdictionId: ID;
  status: InspectionStatus;
  scheduledFor?: string;
  assignedInspector?: ID;
  resultsSummary?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Approval {
  id: ID;
  orgId: ID;
  permitId?: ID;
  inspectionId?: ID;
  decision: ApprovalDecision;
  decidedBy: ID;
  notes?: string;
  createdAt: string;
}

export interface Invoice {
  id: ID;
  orgId: ID;
  permitId: ID;
  status: InvoiceStatus;
  amountCents: number;
  issuedAt: string;
  paidAt?: string;
}

export interface AuditLog {
  id: ID;
  orgId: ID;
  actorUserId: ID;
  entityType:
    | "permit"
    | "inspection"
    | "approval"
    | "invoice"
    | "document"
    | "jurisdiction"
    | "user";
  entityId: ID;
  action: string;
  meta?: Record<string, unknown>;
  createdAt: string;
}
