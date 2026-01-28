export type UnitSystem = "imperial" | "metric";

export type LengthUnit = "ft" | "in" | "m" | "cm" | "mm";
export type AreaUnit = "sqft" | "sqm";
export type VolumeUnit = "cuft" | "cum";

export type Unit = LengthUnit | AreaUnit | VolumeUnit;
export type QuantityKind = "length" | "area" | "volume";
