import { describe, it, expect } from "vitest";
import {
    PERMIT_STATUSES,
    INSPECTION_STATUSES,
    INVOICE_STATUSES,
    isValidPermitStatus,
    isValidInspectionStatus,
    isValidInvoiceStatus,
    getPermitStatusLabel,
    getInspectionStatusLabel,
    getInvoiceStatusLabel,
    PERMIT_STATUS_LABELS,
} from "../labels";

describe("domain labels", () => {
    describe("status constants", () => {
        it("PERMIT_STATUSES contains all expected values", () => {
            expect(PERMIT_STATUSES).toContain("draft");
            expect(PERMIT_STATUSES).toContain("submitted");
            expect(PERMIT_STATUSES).toContain("in_review");
            expect(PERMIT_STATUSES).toContain("approved");
            expect(PERMIT_STATUSES).toContain("denied");
            expect(PERMIT_STATUSES).toContain("active");
            expect(PERMIT_STATUSES).toContain("closed");
            expect(PERMIT_STATUSES.length).toBe(7);
        });

        it("INSPECTION_STATUSES contains all expected values", () => {
            expect(INSPECTION_STATUSES).toContain("scheduled");
            expect(INSPECTION_STATUSES).toContain("in_progress");
            expect(INSPECTION_STATUSES).toContain("complete");
            expect(INSPECTION_STATUSES).toContain("canceled");
            expect(INSPECTION_STATUSES.length).toBe(4);
        });

        it("INVOICE_STATUSES contains all expected values", () => {
            expect(INVOICE_STATUSES).toContain("open");
            expect(INVOICE_STATUSES).toContain("paid");
            expect(INVOICE_STATUSES).toContain("void");
            expect(INVOICE_STATUSES.length).toBe(3);
        });
    });

    describe("validation helpers", () => {
        it("isValidPermitStatus returns true for valid statuses", () => {
            expect(isValidPermitStatus("draft")).toBe(true);
            expect(isValidPermitStatus("approved")).toBe(true);
            expect(isValidPermitStatus("in_review")).toBe(true);
        });

        it("isValidPermitStatus returns false for invalid statuses", () => {
            expect(isValidPermitStatus("invalid")).toBe(false);
            expect(isValidPermitStatus("")).toBe(false);
            expect(isValidPermitStatus("APPROVED")).toBe(false);
        });

        it("isValidInspectionStatus validates correctly", () => {
            expect(isValidInspectionStatus("scheduled")).toBe(true);
            expect(isValidInspectionStatus("invalid")).toBe(false);
        });

        it("isValidInvoiceStatus validates correctly", () => {
            expect(isValidInvoiceStatus("paid")).toBe(true);
            expect(isValidInvoiceStatus("invalid")).toBe(false);
        });
    });

    describe("label helpers", () => {
        it("getPermitStatusLabel returns human-readable labels", () => {
            expect(getPermitStatusLabel("in_review")).toBe("In Review");
            expect(getPermitStatusLabel("approved")).toBe("Approved");
            expect(getPermitStatusLabel("draft")).toBe("Draft");
        });

        it("getInspectionStatusLabel returns human-readable labels", () => {
            expect(getInspectionStatusLabel("in_progress")).toBe("In Progress");
            expect(getInspectionStatusLabel("complete")).toBe("Complete");
        });

        it("getInvoiceStatusLabel returns human-readable labels", () => {
            expect(getInvoiceStatusLabel("open")).toBe("Open");
            expect(getInvoiceStatusLabel("paid")).toBe("Paid");
        });

        it("all permit statuses have labels", () => {
            for (const status of PERMIT_STATUSES) {
                expect(PERMIT_STATUS_LABELS[status]).toBeDefined();
                expect(typeof PERMIT_STATUS_LABELS[status]).toBe("string");
            }
        });
    });
});
