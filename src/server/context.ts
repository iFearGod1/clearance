import { ID } from "@/types/domain";

// ORG_ID is deprecated for data scoping — use repoRegistry.getById(repoId).orgId
// TODO: Remove once all consumers are migrated
/** @deprecated Use repoRegistry to resolve orgId from repoId */
export const ORG_ID: ID = "org_demo";

export const USER_ID: ID = "user_demo_admin";
