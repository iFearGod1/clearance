"use client";

import { useCallback, useEffect, useState } from "react";
import type { Jurisdiction } from "@/types/domain";
import { listJurisdictions } from "@/app/actions/jurisdictions";

export function useJurisdictions() {
  const [jurisdictions, setJurisdictions] = useState<Jurisdiction[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listJurisdictions();
      setJurisdictions(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { jurisdictions, loading, refresh };
}
