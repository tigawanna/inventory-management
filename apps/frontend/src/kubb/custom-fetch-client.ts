import { unknown } from "zod";

/**
 * Subset of FetchRequestConfig
 */
export type RequestConfig<TData = unknown> = {
    baseURL?: string;
    url?: string;
    method: "GET" | "PUT" | "PATCH" | "POST" | "DELETE" | "OPTIONS";
    params?: unknown;
    data?: TData | FormData;
    responseType?:
        | "arraybuffer"
        | "blob"
        | "document"
        | "json"
        | "text"
        | "stream";
    signal?: AbortSignal;
    headers?: [string, string][] | Record<string, string>;
};
/**
 * Subset of FetchResponse
 */

interface ResultErrorResponse {
    error: Record<string, any> & { message: string } | null;
    result?: unknown | undefined;
}
interface ResultDataResponse {
    result: Record<string, any>;
    error?: unknown | undefined;
}

type GenericTdata = ResultDataResponse | ResultErrorResponse;
export type ResponseConfig<TData extends GenericTdata> = {
    data: TData;
    status: number;
    statusText: string;
    headers: Headers;
};

export type ResponseErrorConfig<TError = unknown> = TError;

export const fetchClient = async <
    TData extends ResultDataResponse,
    TError extends ResultErrorResponse,
    TVariables = unknown,
>(
    config: RequestConfig<TVariables>,
): Promise<ResponseConfig<TData | TError>> => {
    const url = new URL(
        config.url || "",
        config.baseURL ? new URL(config.baseURL) : undefined,
    );

    Object.entries(config.params || {}).forEach(([key, value]) => {
        if (value !== undefined) {
            url.searchParams.append(
                key,
                value === null ? "null" : value.toString(),
            );
        }
    });

    const response = await fetch(url.toString(), {
        method: config.method.toUpperCase(),
        body: JSON.stringify(config.data),
        signal: config.signal,
        headers: config.headers,
        credentials: "include",
    });

    if (!response.ok) {
        return {
            // @ts-expect-error
            data: {
                result: unknown,
                error: {
                    message: response.statusText,
                },
            },
            status: response.status,
            statusText: response.statusText,
            headers: response.headers as Headers,
        };
    }

    const data = await response.json() as TData | TError;
    if ("result" in data) {
        if (!data) {
            return {
                // @ts-expect-error
                data: {
                    result: unknown,
                    error: {
                        message: "No data",
                    },
                },
                status: response.status,
                statusText: response.statusText,
                headers: response.headers as Headers,
            };
        }
        return {
            data: data as TData,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers as Headers,
        };
    }
    return {
        data: data as TError,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers as Headers,
    };
};

fetchClient.getConfig = () => {
    throw new Error("Not supported");
};
fetchClient.setConfig = () => {
    throw new Error("Not supported");
};

export default fetchClient;
