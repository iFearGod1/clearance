"use server";

import { getRepoProvider, resolveOrgId } from "@/lib/repo/getRepoProvider";
import { USER_ID } from "@/server/context";
import { Permit, ID } from "@/types/domain";

export async function listPermits(repoId: string): Promise<Permit[]> {
  const provider = getRepoProvider(repoId);
  const orgId = resolveOrgId(repoId);
  return provider.listPermits(orgId);
}

export async function getPermit(repoId: string, id: ID): Promise<Permit | null> {
  const provider = getRepoProvider(repoId);
  const orgId = resolveOrgId(repoId);
  return provider.getPermit(orgId, id);
}

export async function savePermit(repoId: string, permit: Permit): Promise<Permit> {
  const provider = getRepoProvider(repoId);
  const orgId = resolveOrgId(repoId);
  const saved = await provider.upsertPermit(orgId, permit);

  await provider.appendAudit(orgId, {
    id: `aud_${crypto.randomUUID()}`,
    orgId,
    actorUserId: USER_ID,
    entityType: "permit",
    entityId: saved.id,
    action: "permit.upserted",
    meta: { status: saved.status, title: saved.title },
    createdAt: new Date().toISOString(),
  });

  return saved;
}
