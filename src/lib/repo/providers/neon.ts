import type { RepoProvider } from "./types";

/**
 * Neon provider stub.
 * Throws "not configured" for all operations.
 * Replace with real Neon implementation when ready.
 */
export const neonProvider: RepoProvider = {
    providerId: "neon",

    async listPermits() {
        throw new Error("Neon provider not configured");
    },

    async getPermit() {
        throw new Error("Neon provider not configured");
    },

    async upsertPermit() {
        throw new Error("Neon provider not configured");
    },

    async listInspections() {
        throw new Error("Neon provider not configured");
    },

    async listInvoices() {
        throw new Error("Neon provider not configured");
    },

    async listJurisdictions() {
        throw new Error("Neon provider not configured");
    },

    async appendAudit() {
        throw new Error("Neon provider not configured");
    },
};
