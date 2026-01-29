"use client";

import { useEffect, useState } from "react";
import { getDashboardSummary, type DashboardSummary } from "@/app/actions/dashboard";

export function useDashboardSummary() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let live = true;
    (async () => {
      setLoading(true);
      try {
        const s = await getDashboardSummary();
        if (live) setSummary(s);
      } finally {
        if (live) setLoading(false);
      }
    })();
    return () => {
      live = false;
    };
  }, []);

  return { summary, loading };
}
