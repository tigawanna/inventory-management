import { GetApiAuthMe200 } from "@/lib/kubb/gen";

export type ErrorSchema = {
    message: string;
    code?: "login-required" | "admin-required" | "parameters-required" | "query-parametersRequired-required" | "payload-required" | "internal-server-error" | "not-found" | undefined;
    data?: Record<string, {
        code: string;
        message: string;
    }> | undefined;
}

export interface ListResultSchema<T extends Record<string,any> = Record<string,any>>{
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    items: Array<T>;
}


export type InventoryUser= GetApiAuthMe200["result"]
