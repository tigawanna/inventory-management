import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";






const endpoints = makeApi([
	{
		method: "get",
		path: "/api/v1",
		alias: "getApiv1",
		requestFormat: "json",
		response: z.object({ message: z.string() }).strict().passthrough(),
	},
]);

export const IndexApi = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
