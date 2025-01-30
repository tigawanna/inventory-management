import { ErrorSchema } from "@/utils/types/data";
import { envVariables } from "../env";

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
export type ResponseErrorConfig<TError = unknown> = TError;

export interface BaseBadResponse {
  result: null;
  error: ErrorSchema;
}
export interface BaseGoodResponse {
  result: Record<string, any>;
  error?: unknown | undefined;
}

export type SuccessResponse<TData extends BaseGoodResponse> = {
  type: "success";
  data: TData;
  status: number;
  statusText: string;
  headers: Headers;
};
export type NotSuccessResponse = {
  type: "error";
  data: BaseBadResponse;
  status: number;
  statusText: string;
  headers: Headers;
};

export async function fetchClient<
  TData extends BaseGoodResponse,
  TError = unknown,
  TVariables = unknown,
>(
  config: RequestConfig<TVariables>,
): Promise<SuccessResponse<TData> | NotSuccessResponse> {
  config.baseURL = config.baseURL || envVariables.VITE_API_URL;
  config.headers = {...config.headers, "Content-Type": "application/json"}
  const url = new URL(
    config.url || "",
    config.baseURL ? new URL(config.baseURL) : undefined,
  );

  Object.entries(config.params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, value === null ? "null" : value.toString());
    }
  });
  try {
    const response = await fetch(url.toString(), {
      method: config.method.toUpperCase(),
      body: JSON.stringify(config.data),
      signal: config.signal,
      headers: config.headers,
      credentials: "include",
    });

    if (!response.ok) {
      return {
        type: "error",
        data: {
          result: null,
          error: await response
            .json()
            .then((res) => res.error)
            .catch(() => {
              return { message: response.statusText };
            }),
        },
        status: response.status,
        statusText: response.statusText,
        headers: response.headers as Headers,
      };
    }

    const data = await response.json();
    return {
      type: "success",
      data: data as TData,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as Headers,
    };
  } catch (error) {
    return {
      type: "error",
      data: {
        result: null,
        error: error as ErrorSchema,
      },
      status: 500,
      statusText: "Internal Server Error",
      headers: new Headers(),
    };
  }
}

fetchClient.getConfig = () => {
  throw new Error("Not supported");
};
fetchClient.setConfig = () => {
  throw new Error("Not supported");
};

export default fetchClient;
