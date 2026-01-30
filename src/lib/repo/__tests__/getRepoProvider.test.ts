import { describe, it, expect } from "vitest";
import { getRepoProvider, resolveOrgId } from "../getRepoProvider";

describe("getRepoProvider", () => {
    describe("mock provider", () => {
        it("returns mock provider for repo_mock", () => {
            const provider = getRepoProvider("repo_mock");
            expect(provider.providerId).toBe("mock");
        });

        it("mock provider listPermits works", async () => {
            const provider = getRepoProvider("repo_mock");
            const permits = await provider.listPermits("org_demo");
            expect(Array.isArray(permits)).toBe(true);
        });
    });

    describe("neon provider", () => {
        it("returns neon provider for repo_neon", () => {
            const provider = getRepoProvider("repo_neon");
            expect(provider.providerId).toBe("neon");
        });

        it("neon provider throws 'not configured'", async () => {
            const provider = getRepoProvider("repo_neon");
            await expect(provider.listPermits("org_demo")).rejects.toThrow(
                "Neon provider not configured"
            );
        });
    });

    describe("invalid repoId", () => {
        it("throws for invalid repoId", () => {
            expect(() => getRepoProvider("invalid")).toThrow("Invalid repoId: invalid");
        });
    });
});

describe("resolveOrgId", () => {
    it("resolves orgId for valid repoId", () => {
        const orgId = resolveOrgId("repo_mock");
        expect(orgId).toBe("org_demo");
    });

    it("throws for invalid repoId", () => {
        expect(() => resolveOrgId("invalid")).toThrow("Invalid repoId: invalid");
    });
});
