export type ISODateTime = string;

export type AuditActor = {
    userId: string;
    displayName?: string;
};

export type AuditMeta = {
    createdAt: ISODateTime;
    createdBy: AuditActor;
    updatedAt?: ISODateTime;
    updatedBy?: AuditActor;
};
