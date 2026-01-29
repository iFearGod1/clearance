"use server";

import { repo } from "@/server/repo.index";
import { ORG_ID } from "@/server/context";
import { Permit, Inspection, Invoice } from "@/types/domain";

export type DashboardSummary = {
  permits: { total: number; inReview: number; approved: number; denied: number };
  inspections: { total: number; scheduled: number; complete: number };
  invoices: { total: number; open: number; paid: number; void: number; openAmountCents: number };
};

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const [permits, inspections, invoices] = await Promise.all([
    repo.listPermits(ORG_ID),
    repo.listInspections(ORG_ID),
    repo.listInvoices(ORG_ID),
  ]);

  return {
    permits: summarizePermits(permits),
    inspections: summarizeInspections(inspections),
    invoices: summarizeInvoices(invoices),
  };
}

function summarizePermits(permits: Permit[]) {
  return {
    total: permits.length,
    inReview: permits.filter((p) => p.status === "in_review").length,
    approved: permits.filter((p) => p.status === "approved").length,
    denied: permits.filter((p) => p.status === "denied").length,
  };
}

function summarizeInspections(inspections: Inspection[]) {
  return {
    total: inspections.length,
    scheduled: inspections.filter((i) => i.status === "scheduled").length,
    complete: inspections.filter((i) => i.status === "complete").length,
  };
}

function summarizeInvoices(invoices: Invoice[]) {
  const open = invoices.filter((i) => i.status === "open");
  return {
    total: invoices.length,
    open: open.length,
    paid: invoices.filter((i) => i.status === "paid").length,
    void: invoices.filter((i) => i.status === "void").length,
    openAmountCents: open.reduce((sum, i) => sum + i.amountCents, 0),
  };
}
