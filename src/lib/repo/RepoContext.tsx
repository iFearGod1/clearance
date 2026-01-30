"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
    type ReactNode,
} from "react";
import { repoRegistry, DEFAULT_REPO_ID, type RepoEntry } from "./registry";

// --- Constants (per contract) ---
const STORAGE_KEY = "clearance_active_repo";
const URL_PARAM = "repo";

// --- Context shape ---
interface RepoContextValue {
    /** Current active repo ID */
    activeRepoId: string;

    /** Current active repo entry (never undefined after hydration) */
    activeRepo: RepoEntry;

    /** Switch active repo. Returns true if valid, false if invalid. */
    setActiveRepoId: (nextIdOrSlug: string) => boolean;

    /** True only after boot resolution completes */
    hydrated: boolean;
}

const RepoContext = createContext<RepoContextValue | null>(null);

// --- Helpers ---

function readUrlParam(): string | null {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    return params.get(URL_PARAM);
}

function readStorage(): string | null {
    if (typeof window === "undefined") return null;
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch {
        return null;
    }
}

function writeStorage(repoId: string): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, repoId);
    } catch {
        // Storage unavailable
    }
}

function clearStorage(): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch {
        // Storage unavailable
    }
}

function warnInDev(message: string): void {
    if (process.env.NODE_ENV === "development") {
        console.warn(`[Clearance] ${message}`);
    }
}

// --- Provider ---

export function RepoProvider({ children }: { children: ReactNode }) {
    // Start with default repo (SSR-safe)
    const [activeRepoId, setActiveRepoIdState] = useState(DEFAULT_REPO_ID);
    const [hydrated, setHydrated] = useState(false);

    // Hydration: run once on mount (client-only)
    useEffect(() => {
        let resolvedId: string = DEFAULT_REPO_ID;
        let didPersist = false;

        // 1. Try URL param
        const urlValue = readUrlParam();
        if (urlValue) {
            const repo = repoRegistry.validate(urlValue);
            if (repo) {
                resolvedId = repo.id;
                writeStorage(repo.id);
                didPersist = true;
            } else {
                warnInDev(`Invalid repo "${urlValue}" in URL, falling back`);
            }
        }

        // 2. Try localStorage (if URL didn't resolve)
        if (!didPersist) {
            const storedValue = readStorage();
            if (storedValue) {
                const repo = repoRegistry.validate(storedValue);
                if (repo) {
                    resolvedId = repo.id;
                } else {
                    warnInDev(`Invalid repo "${storedValue}" in storage, clearing`);
                    clearStorage();
                }
            }
        }

        // 3. Use default (persist if we didn't already)
        if (resolvedId === DEFAULT_REPO_ID && !didPersist) {
            const storedValue = readStorage();
            if (storedValue !== DEFAULT_REPO_ID) {
                writeStorage(DEFAULT_REPO_ID);
            }
        }

        /* eslint-disable react-hooks/set-state-in-effect */
        setActiveRepoIdState(resolvedId);
        setHydrated(true);
        /* eslint-enable react-hooks/set-state-in-effect */

        // Dev verification logging
        if (process.env.NODE_ENV === "development") {
            console.log("[Clearance] Repo hydration complete:", {
                resolvedId,
                localStorage: readStorage(),
                hydrated: true,
            });
        }
    }, []);

    // Setter with validation
    const setActiveRepoId = useCallback((nextIdOrSlug: string): boolean => {
        const repo = repoRegistry.validate(nextIdOrSlug);
        if (!repo) {
            warnInDev(`Invalid repo "${nextIdOrSlug}", ignoring`);
            return false;
        }

        setActiveRepoIdState(repo.id);
        writeStorage(repo.id);

        if (process.env.NODE_ENV === "development") {
            console.log("[Clearance] Repo switched:", {
                newRepoId: repo.id,
                localStorage: repo.id,
            });
        }

        return true;
    }, []);

    // Memoized active repo
    const activeRepo = useMemo(() => {
        return (
            repoRegistry.getById(activeRepoId) ??
            repoRegistry.getById(DEFAULT_REPO_ID)!
        );
    }, [activeRepoId]);

    const value = useMemo<RepoContextValue>(
        () => ({
            activeRepoId,
            activeRepo,
            setActiveRepoId,
            hydrated,
        }),
        [activeRepoId, activeRepo, setActiveRepoId, hydrated]
    );

    return <RepoContext.Provider value={value}>{children}</RepoContext.Provider>;
}

// --- Hook ---

export function useRepoContext(): RepoContextValue {
    const ctx = useContext(RepoContext);
    if (!ctx) {
        throw new Error("useRepoContext must be used within a RepoProvider");
    }
    return ctx;
}
