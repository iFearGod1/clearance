import type {
    CalculatorExpression,
    CalculatorResult,
} from "@/modules/calculator/types";

export function evaluateExpression(
    expr: CalculatorExpression
): CalculatorResult {
    const { op, a, b } = expr;

    let value: number;

    switch (op) {
        case "add":
            value = a.value + b.value;
            break;
        case "sub":
            value = a.value - b.value;
            break;
        case "mul":
            value = a.value * b.value;
            break;
        case "div":
            if (b.value === 0) throw new Error("Division by zero");
            value = a.value / b.value;
            break;
        default:
            throw new Error("Unsupported operation");
    }

    return { value };
}
