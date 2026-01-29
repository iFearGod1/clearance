"use server";

import { repo } from "@/server/repo.index";
import { ORG_ID, USER_ID } from "@/server/context";
import { Permit, ID } from "@/types/domain";

export async function listPermits(): Promise<Permit[]> {
  return repo.listPermits(ORG_ID);
}

export async function getPermit(id: ID): Promise<Permit | null> {
  return repo.getPermit(ORG_ID, id);
}

export async function savePermit(permit: Permit): Promise<Permit> {
  const saved = await repo.upsertPermit(ORG_ID, permit);

  await repo.appendAudit(ORG_ID, {
    id: `aud_${crypto.randomUUID()}`,
    orgId: ORG_ID,
    actorUserId: USER_ID,
    entityType: "permit",
    entityId: saved.id,
    action: "permit.upserted",
    meta: { status: saved.status, title: saved.title },
    createdAt: new Date().toISOString(),
  });

  return saved;
}
