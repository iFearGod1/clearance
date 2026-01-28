export type Role =
    | "admin"
    | "inspector"
    | "contractor"
    | "finance";

export const ROLE_LABELS: Record<Role, string> = {
    admin: "Admin",
    inspector: "Inspector",
    contractor: "Contractor",
    finance: "Finance",
};
