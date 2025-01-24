export type ErrorSchema = {
    message: string;
    code?: "login-required" | "admin-required" | "parameters-required" | "query-parametersRequired-required" | "payload-required" | "internal-server-error" | "not-found" | undefined;
    data?: Record<string, {
        code: string;
        message: string;
    }> | undefined;
}
