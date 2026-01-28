export function isoNow(): string {
    return new Date().toISOString();
}

export function auditId(prefix: string = "evt"): string {
    // no external libs; deterministic enough for stub usage
    return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
