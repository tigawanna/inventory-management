import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";




const postApicategories_Body = z.object({ id: z.string().optional(), updated_at: z.string().nullish(), created_at: z.string().nullish(), name: z.string(), description: z.string().nullish() }).strict().passthrough();
const patchApicategories_Body = z.object({ id: z.string(), updated_at: z.string().nullish(), created_at: z.string().nullish(), name: z.string().optional(), description: z.string().nullish() }).strict().passthrough();

export const schemas = {
	postApicategories_Body,
	patchApicategories_Body,
};

const endpoints = makeApi([
	{
		method: "get",
		path: "/api/categories",
		alias: "getApicategories",
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
				schema: z.enum(["created_at", "name"]).optional()
			},
		],
		response: z.object({ result: z.object({ page: z.number().nullable(), perPage: z.number().nullable(), totalItems: z.number().nullable(), totalPages: z.number().nullable(), items: z.array(z.object({ id: z.string(), updated_at: z.string().nullable(), created_at: z.string().nullable(), name: z.string(), description: z.string().nullable() }).strict().passthrough()) }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Categories listing validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Categories listing internal server error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "post",
		path: "/api/categories",
		alias: "postApicategories",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postApicategories_Body
			},
			{
				name: "Authorization",
				type: "Header",
				schema: z.string().optional()
			},
		],
		response: z.object({ result: z.object({ id: z.string(), updated_at: z.string().nullable(), created_at: z.string().nullable(), name: z.string(), description: z.string().nullable() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Categories creation validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Categories creation internal server error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "patch",
		path: "/api/categories",
		alias: "patchApicategories",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: patchApicategories_Body
			},
			{
				name: "Authorization",
				type: "Header",
				schema: z.string().optional()
			},
		],
		response: z.object({ result: z.object({ id: z.string(), updated_at: z.string().nullable(), created_at: z.string().nullable(), name: z.string(), description: z.string().nullable() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Categories update validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Categories update internal server error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "delete",
		path: "/api/categories",
		alias: "deleteApicategories",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ id: z.string() }).strict().passthrough()
			},
			{
				name: "Authorization",
				type: "Header",
				schema: z.string().optional()
			},
		],
		response: z.object({ result: z.object({ message: z.string() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Categories deletion validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 404,
				description: `Categories deletion not found error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Categories deletion internal server error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "get",
		path: "/api/categories/:id",
		alias: "getApicategories_id",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string()
			},
		],
		response: z.object({ result: z.object({ id: z.string(), updated_at: z.string().nullable(), created_at: z.string().nullable(), name: z.string(), description: z.string().nullable() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Category by id validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 404,
				description: `Category by id not found error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Category by id internal server error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
]);

export const CategoriesApi = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
