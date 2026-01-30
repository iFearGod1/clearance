"use server";

import { getRepoProvider, resolveOrgId } from "@/lib/repo/getRepoProvider";
import { Jurisdiction } from "@/types/domain";

export async function listJurisdictions(repoId: string): Promise<Jurisdiction[]> {
  const provider = getRepoProvider(repoId);
  const orgId = resolveOrgId(repoId);
  return provider.listJurisdictions(orgId);
}
