import { describe, it, expect } from "vitest";
import { repoRegistry } from "@/lib/repo/registry";

// Since RepoSelector is a React component that depends on context,
// we test the underlying logic and integration points

describe("RepoSelector logic", () => {
    describe("repoRegistry provides options", () => {
        it("has at least mock and sandbox repos", () => {
            const repos = repoRegistry.repos;
            expect(repos.length).toBeGreaterThanOrEqual(2);

            const mock = repos.find((r) => r.slug === "mock");
            const sandbox = repos.find((r) => r.slug === "sandbox");

            expect(mock).toBeDefined();
            expect(mock?.displayName).toBe("Mock Data");

            expect(sandbox).toBeDefined();
            expect(sandbox?.displayName).toBe("Sandbox");
        });

        it("all repos have required display properties", () => {
            for (const repo of repoRegistry.repos) {
                expect(repo.id).toBeDefined();
                expect(repo.slug).toBeDefined();
                expect(repo.displayName).toBeDefined();
                expect(typeof repo.displayName).toBe("string");
                expect(repo.displayName.length).toBeGreaterThan(0);
            }
        });
    });

    describe("setActiveRepoId integration", () => {
        it("validate accepts mock slug", () => {
            const entry = repoRegistry.validate("mock");
            expect(entry).toBeDefined();
            expect(entry?.id).toBe("repo_mock");
        });

        it("validate accepts sandbox slug", () => {
            const entry = repoRegistry.validate("sandbox");
            expect(entry).toBeDefined();
            expect(entry?.id).toBe("repo_sandbox");
        });

        it("validate accepts repo IDs", () => {
            const entry = repoRegistry.validate("repo_mock");
            expect(entry).toBeDefined();
            expect(entry?.slug).toBe("mock");
        });

        it("validate rejects invalid input", () => {
            const entry = repoRegistry.validate("invalid_repo");
            expect(entry).toBeUndefined();
        });
    });
});
