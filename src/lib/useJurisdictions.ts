"use client";

import { useCallback, useEffect, useState } from "react";
import type { Jurisdiction } from "@/types/domain";
import { listJurisdictions } from "@/app/actions/jurisdictions";
import { useRepoContext } from "@/lib/repo";
import { logError } from "@/lib/logger";

export function useJurisdictions() {
  const { activeRepoId, hydrated } = useRepoContext();
  const [jurisdictions, setJurisdictions] = useState<Jurisdiction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listJurisdictions(activeRepoId);
      setJurisdictions(data);
    } catch (err) {
      logError(err, "useJurisdictions.refresh");
      setError(err instanceof Error ? err.message : "Failed to load jurisdictions");
    } finally {
      setLoading(false);
    }
  }, [activeRepoId]);

  useEffect(() => {
    if (hydrated) {
      refresh();
    }
  }, [hydrated, refresh]);

  return { jurisdictions, loading, error, refresh };
}
