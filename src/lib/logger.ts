/**
 * Minimal logging utility with production safety.
 * - logDebug: dev-only, stripped in production
 * - logInfo: minimal, allowed in production
 * - logError: production-safe error logging
 */

const isDev = process.env.NODE_ENV === "development";

/**
 * Debug-level logging. Only outputs in development.
 */
export function logDebug(message: string, ...args: unknown[]): void {
    if (isDev) {
        console.log(`[DEBUG] ${message}`, ...args);
    }
}

/**
 * Info-level logging. Minimal output, allowed in production.
 */
export function logInfo(message: string, ...args: unknown[]): void {
    console.info(`[INFO] ${message}`, ...args);
}

/**
 * Error-level logging. Production-safe.
 * Does not expose stack traces or sensitive data to users.
 */
export function logError(
    error: unknown,
    context?: string
): void {
    const prefix = context ? `[ERROR:${context}]` : "[ERROR]";

    if (error instanceof Error) {
        if (isDev) {
            console.error(prefix, error.message, error.stack);
        } else {
            // Production: log message only, no stack trace
            console.error(prefix, error.message);
        }
    } else {
        console.error(prefix, String(error));
    }
}

/**
 * Warn-level logging. Allowed in production.
 */
export function logWarn(message: string, ...args: unknown[]): void {
    console.warn(`[WARN] ${message}`, ...args);
}
