export type ISODateTime = string;

export type AuditActor = {
    userId: string;
    displayName?: string;
    role?: string;
};

export type AuditEventType =
    | "calc.save_to_record"
    | "measurement.save_to_record";

export type AuditEventResult = "success" | "denied" | "error";

export type AuditEvent = {
    id: string;
    type: AuditEventType;
    at: ISODateTime;
    actor: AuditActor;

    // lightweight context for now
    entity?: {
        kind: "calculation" | "measurement";
        id?: string;
        label?: string;
    };

    // store minimal structured metadata; keep it non-sensitive
    meta?: Record<string, string | number | boolean | null>;

    result: AuditEventResult;
    message?: string;
};
