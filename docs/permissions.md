# Clearance — Permissions Matrix

Roles define allowed actions across system entities.

---

## Roles
- Admin
- Compliance Manager
- Inspector
- Finance
- Viewer

---

## Permissions Table

| Action / Role        | Admin | Compliance Manager | Inspector | Finance | Viewer |
|----------------------|-------|--------------------|-----------|---------|--------|
| View Permits         | Yes   | Yes                | Yes       | Yes     | Yes    |
| Create / Edit Permit | Yes   | Yes                | No        | No      | No     |
| Schedule Inspection  | Yes   | Yes                | No        | No      | No     |
| Perform Inspection   | Yes   | No                 | Yes       | No      | No     |
| Submit Inspection    | Yes   | No                 | Yes       | No      | No     |
| Approve              | Yes   | Yes                | No        | No      | No     |
| Generate Invoice     | Yes   | No                 | No        | Yes     | No     |
| View Invoices        | Yes   | Yes                | No        | Yes     | Yes    |
| Export Data          | Yes   | Yes                | No        | Yes     | No     |
| Manage Users/Roles   | Yes   | No                 | No        | No      | No     |

---

## Notes
- Admin overrides all permissions
- Viewer is strictly read-only
- Inspectors cannot approve or invoice
