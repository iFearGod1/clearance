import type { AuditMeta } from "@/types/audit";
import type { LengthUnit, UnitSystem } from "@/types/units";

export type GPSFix = {
    lat: number;
    lng: number;
    accuracyM?: number;
};

export type MeasurementMethod =
    | "manual"
    | "ar_assist"
    | "photo_reference"
    | "device_sensor";

export type LengthMeasurement = {
    id: string;
    label: string;
    unitSystem: UnitSystem;
    value: number;
    unit: LengthUnit;
    method: MeasurementMethod;

    gps?: GPSFix;
    capturedAt?: string;

    permitId?: string;
    requirementId?: string;
    jurisdictionId?: string;

    audit: AuditMeta;
};
