import type { RepoProvider } from "./types";
import type { ID } from "@/types/domain";

/**
 * Neon provider stub.
 * Throws "not configured" for all operations.
 * Replace with real Neon implementation when ready.
 */
export const neonProvider: RepoProvider = {
    providerId: "neon",

    async listPermits(_orgId: ID) {
        throw new Error("Neon provider not configured");
    },

    async getPermit(_orgId: ID, _id: ID) {
        throw new Error("Neon provider not configured");
    },

    async upsertPermit(_orgId: ID) {
        throw new Error("Neon provider not configured");
    },

    async listInspections(_orgId: ID) {
        throw new Error("Neon provider not configured");
    },

    async listInvoices(_orgId: ID) {
        throw new Error("Neon provider not configured");
    },

    async listJurisdictions(_orgId: ID) {
        throw new Error("Neon provider not configured");
    },

    async appendAudit(_orgId: ID) {
        throw new Error("Neon provider not configured");
    },
};
