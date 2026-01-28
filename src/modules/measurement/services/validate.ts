import type { LengthMeasurement } from "@/modules/measurement/types";

export function validateLengthMeasurement(
    m: LengthMeasurement
): void {
    if (!Number.isFinite(m.value))
        throw new Error("Measurement value must be finite");
    if (m.value < 0)
        throw new Error("Measurement value cannot be negative");
    if (!m.label || m.label.trim().length < 2)
        throw new Error("Measurement label is required");
}
