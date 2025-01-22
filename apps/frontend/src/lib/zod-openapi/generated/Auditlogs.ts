import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";






const endpoints = makeApi([
	{
		method: "get",
		path: "/api/auditlogs",
		alias: "getApiauditlogs",
		requestFormat: "json",
		parameters: [
			{
				name: "page",
				type: "Query",
				schema: z.string().optional().default("1")
			},
			{
				name: "limit",
				type: "Query",
				schema: z.string().optional().default("10")
			},
			{
				name: "order",
				type: "Query",
				schema: z.enum(["asc", "desc"]).optional().default("desc")
			},
			{
				name: "search",
				type: "Query",
				schema: z.string().optional()
			},
			{
				name: "sort",
				type: "Query",
				schema: z.literal("created_at").optional()
			},
		],
		response: z.object({ result: z.object({ page: z.number().nullable(), perPage: z.number().nullable(), totalItems: z.number().nullable(), totalPages: z.number().nullable(), items: z.array(z.object({ id: z.string(), updated_at: z.string().nullable(), created_at: z.string().nullable(), userId: z.string().nullable(), action: z.string(), entityType: z.string(), entityId: z.string(), ipAddress: z.string().nullable(), oldData: z.unknown().nullish(), newData: z.unknown().nullish(), user: z.object({ name: z.string(), email: z.string(), avatarUrl: z.string().nullable(), role: z.enum(["admin", "user"]).nullable(), id: z.string() }).strict().passthrough().nullable() }).strict().passthrough()) }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Auditlogs listing validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Auditlogs listing internal server error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "get",
		path: "/api/auditlogs/:id",
		alias: "getApiauditlogs_id",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string()
			},
		],
		response: z.object({ result: z.object({ id: z.string(), updated_at: z.string().nullable(), created_at: z.string().nullable(), userId: z.string().nullable(), action: z.string(), entityType: z.string(), entityId: z.string(), ipAddress: z.string().nullable(), oldData: z.unknown().nullish(), newData: z.unknown().nullish(), user: z.object({ name: z.string(), email: z.string(), avatarUrl: z.string().nullable(), role: z.enum(["admin", "user"]).nullable(), id: z.string() }).strict().passthrough().nullable() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Inventpry by id validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 404,
				description: `Inventpry by id not found error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Inventpry by id internal server error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
]);

export const AuditlogsApi = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
