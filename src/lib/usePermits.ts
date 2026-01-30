"use client";

import { useCallback, useEffect, useState } from "react";
import type { Permit } from "@/types/domain";
import { listPermits, savePermit } from "@/app/actions/permits";
import { useRepoContext } from "@/lib/repo";

export function usePermits() {
  const { activeRepoId, hydrated } = useRepoContext();
  const [permits, setPermits] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listPermits(activeRepoId);
      setPermits(data);
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

  return { permits, loading, refresh, upsert };
}
