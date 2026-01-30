"use client";

import { useCallback, useEffect, useState } from "react";
import type { Permit } from "@/types/domain";
import { listPermits, savePermit } from "@/app/actions/permits";
import { useRepoContext } from "@/lib/repo";
import { logError } from "@/lib/logger";

export function usePermits() {
  const { activeRepoId, hydrated } = useRepoContext();
  const [permits, setPermits] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listPermits(activeRepoId);
      setPermits(data);
    } catch (err) {
      logError(err, "usePermits.refresh");
      setError(err instanceof Error ? err.message : "Failed to load permits");
    } finally {
      setLoading(false);
    }
  }, [activeRepoId]);

  const upsert = useCallback(async (permit: Permit) => {
    const saved = await savePermit(activeRepoId, permit);
    setPermits((prev) => {
      const idx = prev.findIndex((p) => p.id === saved.id);
      if (idx === -1) return [saved, ...prev];
      const next = [...prev];
      next[idx] = saved;
      return next;
    });
    return saved;
  }, [activeRepoId]);

  useEffect(() => {
    if (hydrated) {
      refresh();
    }
  }, [hydrated, refresh]);

  return { permits, loading, error, refresh, upsert };
}
