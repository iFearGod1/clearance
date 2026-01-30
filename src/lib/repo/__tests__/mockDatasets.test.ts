import { describe, it, expect } from "vitest";
import { mockProvider } from "../providers/mock";

describe("mock provider datasets", () => {
    describe("org_demo dataset (repo_mock)", () => {
        it("returns permits for org_demo", async () => {
            const permits = await mockProvider.listPermits("org_demo");
            expect(permits.length).toBeGreaterThanOrEqual(8);
            expect(permits.every((p) => p.orgId === "org_demo")).toBe(true);
        });

        it("returns jurisdictions for org_demo", async () => {
            const jurisdictions = await mockProvider.listJurisdictions("org_demo");
            expect(jurisdictions.length).toBeGreaterThanOrEqual(5);
            expect(jurisdictions.every((j) => j.orgId === "org_demo")).toBe(true);
        });

        it("includes NYC DOB jurisdiction", async () => {
            const jurisdictions = await mockProvider.listJurisdictions("org_demo");
            const nyc = jurisdictions.find((j) => j.name === "NYC DOB");
            expect(nyc).toBeDefined();
        });
    });

    describe("org_sandbox dataset (repo_sandbox)", () => {
        it("returns permits for org_sandbox", async () => {
            const permits = await mockProvider.listPermits("org_sandbox");
            expect(permits.length).toBeGreaterThanOrEqual(10);
            expect(permits.every((p) => p.orgId === "org_sandbox")).toBe(true);
        });

        it("returns jurisdictions for org_sandbox", async () => {
            const jurisdictions = await mockProvider.listJurisdictions("org_sandbox");
            expect(jurisdictions.length).toBeGreaterThanOrEqual(6);
            expect(jurisdictions.every((j) => j.orgId === "org_sandbox")).toBe(true);
        });

        it("includes Denver B&S jurisdiction", async () => {
            const jurisdictions = await mockProvider.listJurisdictions("org_sandbox");
            const denver = jurisdictions.find((j) => j.name === "Denver B&S");
            expect(denver).toBeDefined();
        });
    });

    describe("datasets are distinct", () => {
        it("org_demo and org_sandbox have different permits", async () => {
            const demoPermits = await mockProvider.listPermits("org_demo");
            const sandboxPermits = await mockProvider.listPermits("org_sandbox");

            // No overlap in permit IDs
            const demoIds = new Set(demoPermits.map((p) => p.id));
            const sandboxIds = new Set(sandboxPermits.map((p) => p.id));
            const overlap = [...demoIds].filter((id) => sandboxIds.has(id));
            expect(overlap.length).toBe(0);
        });

        it("org_demo and org_sandbox have different jurisdictions", async () => {
            const demoJurisdictions = await mockProvider.listJurisdictions("org_demo");
            const sandboxJurisdictions = await mockProvider.listJurisdictions("org_sandbox");

            // No overlap in jurisdiction names
            const demoNames = new Set(demoJurisdictions.map((j) => j.name));
            const sandboxNames = new Set(sandboxJurisdictions.map((j) => j.name));
            const overlap = [...demoNames].filter((name) => sandboxNames.has(name));
            expect(overlap.length).toBe(0);
        });
    });

    describe("data has variety", () => {
        it("org_demo permits have varied statuses", async () => {
            const permits = await mockProvider.listPermits("org_demo");
            const statuses = new Set(permits.map((p) => p.status));
            expect(statuses.size).toBeGreaterThanOrEqual(4);
        });

        it("org_sandbox permits have varied statuses", async () => {
            const permits = await mockProvider.listPermits("org_sandbox");
            const statuses = new Set(permits.map((p) => p.status));
            expect(statuses.size).toBeGreaterThanOrEqual(4);
        });
    });
});
