import type { AuditEvent } from "./types";

const EVENTS: AuditEvent[] = [];

export function appendAuditEvent(event: AuditEvent): void {
    // append-only: push only
    EVENTS.push(event);
}

export function readAuditEvents(): AuditEvent[] {
    // return a shallow copy to reduce accidental mutation
    return [...EVENTS];
}
