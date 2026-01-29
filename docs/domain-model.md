# Clearance — Domain Model

This document defines the core entities of the Clearance system and their relationships.
UI, APIs, and storage are intentionally excluded.

---

## Organization
**Description**
A legal or operational entity using Clearance.

**Owns**
- Users
- Jurisdictions
- Permits
- Invoices
- Documents
- Audit Logs

**Referenced by**
- User
- Permit
- Invoice
- Audit Log

---

## User
**Description**
An authenticated individual acting within an Organization.

**Belongs to**
- One Organization

**Has**
- One or more Roles

**Referenced by**
- Permit (created_by, assigned_to)
- Inspection (assigned_inspector)
- Approval
- Audit Log

---

## Role
**Description**
A permission grouping defining allowed actions.

**Assigned to**
- Users

**Controls access to**
- Permits
- Inspections
- Approvals
- Invoices
- Documents

---

## Jurisdiction
**Description**
A regulatory region (city, county, state, authority).

**Belongs to**
- One Organization

**Referenced by**
- Permit
- Inspection
- Approval

---

## Permit
**Description**
A request for authorization within a Jurisdiction.

**Belongs to**
- Organization
- Jurisdiction

**Has**
- Status
- Documents
- Inspections
- Approvals
- Audit Logs

**Referenced by**
- Inspection
- Approval
- Invoice

---

## Inspection
**Description**
A scheduled or completed verification event.

**Belongs to**
- Permit

**Assigned to**
- User (Inspector)

**Produces**
- Results
- Documents

---

## Approval
**Description**
A decision record granting or denying a Permit or Inspection.

**Belongs to**
- Permit or Inspection

**Performed by**
- User

---

## Invoice
**Description**
A bill generated from an approved Permit.

**Belongs to**
- Organization
- Permit

**Referenced by**
- Audit Log

---

## Document
**Description**
A file or digital artifact.

**Belongs to**
- Organization

**Associated with**
- Permit
- Inspection
- Approval
- Invoice

---

## Audit Log
**Description**
An immutable record of system actions.

**Belongs to**
- Organization

**References**
- User
- Entity acted upon
