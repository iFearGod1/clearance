import { describe, it, expect } from "vitest";
import { repoRegistry, DEFAULT_REPO_ID } from "../registry";

/**
 * Pure helper for boot resolution logic.
 * Extracted for testability.
 */
export function resolveBootRepo(
    urlParam: string | null,
    storedValue: string | null
): { repoId: string; shouldPersist: boolean; shouldClearStorage: boolean } {
    // 1. Try URL param
    if (urlParam) {
        const repo = repoRegistry.validate(urlParam);
        if (repo) {
            return { repoId: repo.id, shouldPersist: true, shouldClearStorage: false };
        }
        // Invalid URL param, fall through
    }

    // 2. Try stored value
    if (storedValue) {
        const repo = repoRegistry.validate(storedValue);
        if (repo) {
            return { repoId: repo.id, shouldPersist: false, shouldClearStorage: false };
        }
        // Invalid stored value, clear and fall through
        return { repoId: DEFAULT_REPO_ID, shouldPersist: true, shouldClearStorage: true };
    }

    // 3. Use default
    return { repoId: DEFAULT_REPO_ID, shouldPersist: true, shouldClearStorage: false };
}

describe("resolveBootRepo", () => {
    describe("URL param takes priority", () => {
        it("uses valid URL param and persists", () => {
            const result = resolveBootRepo("neon", null);
            expect(result.repoId).toBe("repo_neon");
            expect(result.shouldPersist).toBe(true);
            expect(result.shouldClearStorage).toBe(false);
        });

        it("URL param overrides stored value", () => {
            const result = resolveBootRepo("neon", "repo_mock");
            expect(result.repoId).toBe("repo_neon");
            expect(result.shouldPersist).toBe(true);
        });

        it("invalid URL param falls through to storage", () => {
            const result = resolveBootRepo("bogus", "repo_mock");
            expect(result.repoId).toBe("repo_mock");
            expect(result.shouldPersist).toBe(false);
        });
    });

    describe("storage fallback", () => {
        it("uses valid stored value", () => {
            const result = resolveBootRepo(null, "repo_neon");
            expect(result.repoId).toBe("repo_neon");
            expect(result.shouldPersist).toBe(false);
            expect(result.shouldClearStorage).toBe(false);
        });

        it("invalid stored value clears and uses default", () => {
            const result = resolveBootRepo(null, "invalid");
            expect(result.repoId).toBe(DEFAULT_REPO_ID);
            expect(result.shouldPersist).toBe(true);
            expect(result.shouldClearStorage).toBe(true);
        });
    });

    describe("default fallback", () => {
        it("uses default when nothing provided", () => {
            const result = resolveBootRepo(null, null);
            expect(result.repoId).toBe(DEFAULT_REPO_ID);
            expect(result.shouldPersist).toBe(true);
            expect(result.shouldClearStorage).toBe(false);
        });
    });
});
