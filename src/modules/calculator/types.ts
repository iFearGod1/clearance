import type { AuditMeta } from "@/types/audit";
import type { Unit, UnitSystem } from "@/types/units";

export type CalculatorOp = "add" | "sub" | "mul" | "div";

export type CalculatorOperand = {
    label?: string;
    value: number;
    unit?: Unit;
};

export type CalculatorExpression = {
    op: CalculatorOp;
    a: CalculatorOperand;
    b: CalculatorOperand;
};

export type CalculatorResult = {
    value: number;
    unit?: Unit;
};

export type SavedCalculation = {
    id: string;
    name: string;
    unitSystem: UnitSystem;
    expression: CalculatorExpression;
    result: CalculatorResult;

    permitId?: string;
    requirementId?: string;
    jurisdictionId?: string;

    audit: AuditMeta;
};
