"use client";

import { useCallback, useEffect, useState } from "react";
import { getDashboardSummary, type DashboardSummary } from "@/app/actions/dashboard";
import { useRepoContext } from "@/lib/repo";
import { logError } from "@/lib/logger";

export function useDashboardSummary() {
  const { activeRepoId, hydrated } = useRepoContext();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const s = await getDashboardSummary(activeRepoId);
      setSummary(s);
    } catch (err) {
      logError(err, "useDashboardSummary.refresh");
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, [activeRepoId]);

  useEffect(() => {
    if (!hydrated) return;
    refresh();
  }, [hydrated, refresh]);

  return { summary, loading, error, refresh };
}
