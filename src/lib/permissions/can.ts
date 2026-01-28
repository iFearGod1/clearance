import type { Principal } from "./types";
import type { Action } from "./actions";
import { DEFAULT_POLICY } from "./policy";

export function can(principal: Principal, action: Action): boolean {
    return Boolean(DEFAULT_POLICY[principal.role]?.[action]);
}
