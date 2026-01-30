import { repoRegistry } from "./registry";
import { mockProvider, neonProvider, type RepoProvider } from "./providers";

/**
 * Resolves the appropriate RepoProvider for a given repoId.
 * Throws if repoId is invalid.
 */
export function getRepoProvider(repoId: string): RepoProvider {
    const entry = repoRegistry.getById(repoId);
    if (!entry) {
        throw new Error(`Invalid repoId: ${repoId}`);
    }

    switch (entry.provider) {
        case "mock":
            return mockProvider;
        case "neon":
            return neonProvider;
        case "postgres":
        case "planetscale":
            throw new Error(`Provider "${entry.provider}" not implemented`);
        default:
            throw new Error(`Unknown provider: ${entry.provider}`);
    }
}

/**
 * Resolves orgId from repoId via registry.
 * Throws if repoId is invalid.
 */
export function resolveOrgId(repoId: string): string {
    const entry = repoRegistry.getById(repoId);
    if (!entry) {
        throw new Error(`Invalid repoId: ${repoId}`);
    }
    return entry.orgId;
}
