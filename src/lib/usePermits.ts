"use client";

import { useCallback, useEffect, useState } from "react";
import type { Permit } from "@/types/domain";
import { listPermits, savePermit } from "@/app/actions/permits";

export function usePermits() {
  const [permits, setPermits] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listPermits();
      setPermits(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const upsert = useCallback(async (permit: Permit) => {
    const saved = await savePermit(permit);
    setPermits((prev) => {
      const idx = prev.findIndex((p) => p.id === saved.id);
      if (idx === -1) return [saved, ...prev];
      const next = [...prev];
      next[idx] = saved;
      return next;
    });
    return saved;
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { permits, loading, refresh, upsert };
}
