import { describe, it, expect } from "vitest";
import { repoRegistry, DEFAULT_REPO_ID } from "../registry";

describe("repoRegistry", () => {
    describe("getById", () => {
        it("returns repo entry for valid id", () => {
            const entry = repoRegistry.getById("repo_mock");
            expect(entry).toBeDefined();
            expect(entry?.id).toBe("repo_mock");
            expect(entry?.provider).toBe("mock");
        });

        it("returns undefined for invalid id", () => {
            const entry = repoRegistry.getById("invalid_id");
            expect(entry).toBeUndefined();
        });
    });

    describe("getBySlug", () => {
        it("returns repo entry for valid slug", () => {
            const entry = repoRegistry.getBySlug("neon");
            expect(entry).toBeDefined();
            expect(entry?.id).toBe("repo_neon");
            expect(entry?.provider).toBe("neon");
        });

        it("returns undefined for invalid slug", () => {
            const entry = repoRegistry.getBySlug("invalid_slug");
            expect(entry).toBeUndefined();
        });
    });

    describe("validate", () => {
        it("validates by id", () => {
            const entry = repoRegistry.validate("repo_mock");
            expect(entry).toBeDefined();
            expect(entry?.id).toBe("repo_mock");
        });

        it("validates by slug", () => {
            const entry = repoRegistry.validate("neon");
            expect(entry).toBeDefined();
            expect(entry?.id).toBe("repo_neon");
        });

        it("returns undefined for invalid input", () => {
            const entry = repoRegistry.validate("bogus");
            expect(entry).toBeUndefined();
        });
    });

    describe("defaultRepoId", () => {
        it("matches DEFAULT_REPO_ID export", () => {
            expect(repoRegistry.defaultRepoId).toBe(DEFAULT_REPO_ID);
        });

        it("is a valid repo id", () => {
            const entry = repoRegistry.getById(DEFAULT_REPO_ID);
            expect(entry).toBeDefined();
        });
    });
});
