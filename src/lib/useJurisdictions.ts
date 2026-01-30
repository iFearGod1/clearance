"use client";

import { useCallback, useEffect, useState } from "react";
import type { Jurisdiction } from "@/types/domain";
import { listJurisdictions } from "@/app/actions/jurisdictions";
import { useRepoContext } from "@/lib/repo";

export function useJurisdictions() {
  const { activeRepoId, hydrated } = useRepoContext();
  const [jurisdictions, setJurisdictions] = useState<Jurisdiction[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listJurisdictions(activeRepoId);
      setJurisdictions(data);
    } finally {
      setLoading(false);
    }
  }, [activeRepoId]);

  useEffect(() => {
    if (hydrated) {
      refresh();
    }
  }, [hydrated, refresh]);

  return { jurisdictions, loading, refresh };
}
