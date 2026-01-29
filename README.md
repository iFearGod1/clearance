# Clearance

**An enterprise compliance command center demo** — a portfolio-ready Next.js application showcasing a permits, inspections, and approvals management system designed for organizations operating across multiple regulatory jurisdictions.

---

## What's Included

- **Dashboard** — Real-time summary of permits, inspections, invoices, and jurisdictions
- **Permit List** — Browse and filter all permit records with humanized status labels
- **Permit Detail** — View individual permit information with jurisdiction context
- **Utility Panel** — Interactive compliance calculator with measurement tools
- **Audit/Mock Data** — In-memory repository layer ready to swap for a real database
- **Hero Background Video** — Autoplay with reduced-motion and save-data support

---

## Screenshots

| Light Mode | Dark Mode |
|------------|-----------|
| ![Dashboard Light](assets/clearance-dashboard-insight-light.png) | ![Dashboard Dark](assets/clearance-dashboard-insight-dark.png) |

---

## Routes

| Route | Description |
|-------|-------------|
| `/` | Marketing hero with embedded dashboard |
| `/permits` | Permits list view |
| `/permits/[id]` | Permit detail view |
| `/tools/utility` | Utility panel / calculator |
| `/legal/terms` | Terms of Service |
| `/legal/privacy` | Privacy Policy |

---

## Local Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

To build for production:

```bash
npm run build
```

---

## Deployed

**Live demo:** [https://clearance-omega.vercel.app](https://clearance-omega.vercel.app)

---

## Tech

Next.js App Router · TypeScript · Server Actions · Mock Repository Layer · Vercel Deploy
