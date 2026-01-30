"use client";

import { ReactNode, memo } from "react";
import { RepoSelector } from "./RepoSelector";
import { ErrorBoundary } from "@/components/ErrorBoundary";

interface AppShellProps {
    children: ReactNode;
}

/**
 * App shell wrapper that includes:
 * - RepoSelector in header area
 * - ErrorBoundary around children for graceful error handling
 */
function AppShellInner({ children }: AppShellProps) {
    return (
        <>
            <RepoSelector />
            <ErrorBoundary>
                {children}
            </ErrorBoundary>
        </>
    );
}

// Memoize to prevent unnecessary re-renders
export const AppShell = memo(AppShellInner);
