"use client";

import { useEffect, useState } from "react";
import { getDashboardSummary, type DashboardSummary } from "@/app/actions/dashboard";
import { useRepoContext } from "@/lib/repo";

export function useDashboardSummary() {
  const { activeRepoId, hydrated } = useRepoContext();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hydrated) return;

    let live = true;
    (async () => {
      setLoading(true);
      try {
        const s = await getDashboardSummary(activeRepoId);
        if (live) setSummary(s);
      } finally {
        if (live) setLoading(false);
      }
    })();
    return () => {
      live = false;
    };
  }, [activeRepoId, hydrated]);

  return { summary, loading };
}
