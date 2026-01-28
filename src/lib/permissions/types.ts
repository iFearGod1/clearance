import type { Role } from "./roles";
import type { Action } from "./actions";

export type PermissionSet = Record<Action, boolean>;

export type Principal = {
    userId: string;
    role: Role;
};

export type Policy = Record<Role, PermissionSet>;
