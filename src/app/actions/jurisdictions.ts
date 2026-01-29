"use server";

import { repo } from "@/server/repo.index";
import { ORG_ID } from "@/server/context";
import { Jurisdiction } from "@/types/domain";

export async function listJurisdictions(): Promise<Jurisdiction[]> {
  return repo.listJurisdictions(ORG_ID);
}
