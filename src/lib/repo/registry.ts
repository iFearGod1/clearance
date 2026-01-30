import type { ID } from "@/types/domain";

/**
 * Repo configuration entry.
 * Represents a data source that can be selected as the active repo.
 */
export interface RepoEntry {
    /** Primary identifier — stable, opaque, never changes */
    id: string;

    /** Human-readable URL segment — stable after creation */
    slug: string;

    /** Display name — mutable, not used for logic */
    displayName: string;

    /** Repo provider type */
    provider: "mock" | "neon" | "postgres" | "planetscale";

    /** Associated org ID for data scoping */
    orgId: ID;
}

/**
 * Registry interface for available repos.
 */
export interface RepoRegistry {
    repos: readonly RepoEntry[];
    defaultRepoId: string;

    getById(id: string): RepoEntry | undefined;
    getBySlug(slug: string): RepoEntry | undefined;
    validate(idOrSlug: string): RepoEntry | undefined;
}

// --- Registry entries ---

const MOCK_REPO: RepoEntry = {
    id: "repo_mock",
    slug: "mock",
    displayName: "Mock Data",
    provider: "mock",
    orgId: "org_demo",
};

const SANDBOX_REPO: RepoEntry = {
    id: "repo_sandbox",
    slug: "sandbox",
    displayName: "Sandbox",
    provider: "mock",
    orgId: "org_sandbox",
};

const NEON_REPO: RepoEntry = {
    id: "repo_neon",
    slug: "neon",
    displayName: "Neon Database",
    provider: "neon",
    orgId: "org_demo",
};

const REPOS: readonly RepoEntry[] = [MOCK_REPO, SANDBOX_REPO, NEON_REPO];

// --- Registry implementation ---

export const DEFAULT_REPO_ID = MOCK_REPO.id;

export const repoRegistry: RepoRegistry = {
    repos: REPOS,
    defaultRepoId: DEFAULT_REPO_ID,

    getById(id: string): RepoEntry | undefined {
        return REPOS.find((r) => r.id === id);
    },

    getBySlug(slug: string): RepoEntry | undefined {
        return REPOS.find((r) => r.slug === slug);
    },

    validate(idOrSlug: string): RepoEntry | undefined {
        return this.getById(idOrSlug) ?? this.getBySlug(idOrSlug);
    },
};
