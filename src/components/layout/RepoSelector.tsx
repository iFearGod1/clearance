"use client";

import { useState, useCallback, memo } from "react";
import { useRepoContext } from "@/lib/repo";
import { repoRegistry } from "@/lib/repo/registry";

function RepoSelectorInner() {
    const { activeRepoId, hydrated, setActiveRepoId } = useRepoContext();
    const [error, setError] = useState<string | null>(null);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setError(null);
            const success = setActiveRepoId(e.target.value);
            if (!success) {
                setError("Invalid repo selection");
            }
        },
        [setActiveRepoId]
    );

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                backgroundColor: "var(--surface, #1a1a1a)",
                borderBottom: "1px solid var(--border, #333)",
                fontSize: "0.85rem",
            }}
        >
            <label htmlFor="repo-selector" style={{ color: "#bbb" }}>
                Repo:
            </label>
            <select
                id="repo-selector"
                value={activeRepoId}
                onChange={handleChange}
                disabled={!hydrated}
                style={{
                    padding: "0.25rem 0.5rem",
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    color: "#f0f0f0",
                    border: "1px solid #555",
                    borderRadius: "4px",
                    cursor: hydrated ? "pointer" : "not-allowed",
                    opacity: hydrated ? 1 : 0.5,
                }}
            >
                {repoRegistry.repos.map((repo) => (
                    <option key={repo.id} value={repo.id}>
                        {repo.displayName}
                    </option>
                ))}
            </select>

            {!hydrated && (
                <span style={{ color: "var(--muted, #888)", fontSize: "0.75rem" }}>
                    Loading…
                </span>
            )}

            {error && (
                <span
                    style={{
                        color: "var(--error, #dc3545)",
                        fontSize: "0.75rem",
                        marginLeft: "0.5rem",
                    }}
                >
                    {error}
                </span>
            )}
        </div>
    );
}

// Memoize to prevent unnecessary re-renders
export const RepoSelector = memo(RepoSelectorInner);
