import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";




const postApiinventory_Body = z.object({ id: z.string().optional(), updated_at: z.string().nullish(), created_at: z.string().nullish(), name: z.string(), description: z.string().nullish(), quantity: z.number().int().gte(-2147483648).lte(2147483647).optional(), price: z.string(), categoryId: z.string().nullish(), sku: z.string().nullish(), isActive: z.boolean().nullish(), supplier: z.string().nullish(), location: z.string().nullish(), weight: z.string().nullish(), dimensions: z.string().nullish(), tags: z.array(z.string()).nullish() }).strict().passthrough();
const patchApiinventory_Body = z.object({ id: z.string(), updated_at: z.string().nullish(), created_at: z.string().nullish(), name: z.string().optional(), description: z.string().nullish(), quantity: z.number().int().gte(-2147483648).lte(2147483647).optional(), price: z.string().optional(), categoryId: z.string().nullish(), sku: z.string().nullish(), isActive: z.boolean().nullish(), supplier: z.string().nullish(), location: z.string().nullish(), weight: z.string().nullish(), dimensions: z.string().nullish(), tags: z.array(z.string()).nullish() }).strict().passthrough();

export const schemas = {
	postApiinventory_Body,
	patchApiinventory_Body,
};

const endpoints = makeApi([
	{
		method: "get",
		path: "/api/inventory",
		alias: "getApiinventory",
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
				schema: z.enum(["name", "price", "quantity"]).optional()
			},
			{
				name: "categoryId",
				type: "Query",
				schema: z.string().optional()
			},
		],
		response: z.object({ result: z.object({ page: z.number().nullable(), perPage: z.number().nullable(), totalItems: z.number().nullable(), totalPages: z.number().nullable(), items: z.array(z.object({ id: z.string(), updated_at: z.string().nullable(), created_at: z.string().nullable(), name: z.string(), description: z.string().nullable(), quantity: z.number().int().gte(-2147483648).lte(2147483647), price: z.string(), categoryId: z.string().nullable(), sku: z.string().nullable(), isActive: z.boolean().nullable(), supplier: z.string().nullable(), location: z.string().nullable(), weight: z.string().nullable(), dimensions: z.string().nullable(), tags: z.array(z.string()).nullable() }).strict().passthrough()) }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Inventpry listing validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Inventpry listing internal server error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "post",
		path: "/api/inventory",
		alias: "postApiinventory",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postApiinventory_Body
			},
			{
				name: "Authorization",
				type: "Header",
				schema: z.string().optional()
			},
		],
		response: z.object({ result: z.object({ id: z.string(), updated_at: z.string().nullable(), created_at: z.string().nullable(), name: z.string(), description: z.string().nullable(), quantity: z.number().int().gte(-2147483648).lte(2147483647), price: z.string(), categoryId: z.string().nullable(), sku: z.string().nullable(), isActive: z.boolean().nullable(), supplier: z.string().nullable(), location: z.string().nullable(), weight: z.string().nullable(), dimensions: z.string().nullable(), tags: z.array(z.string()).nullable() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Inventory creation validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Inventory creation internal server error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "patch",
		path: "/api/inventory",
		alias: "patchApiinventory",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: patchApiinventory_Body
			},
			{
				name: "Authorization",
				type: "Header",
				schema: z.string().optional()
			},
		],
		response: z.object({ result: z.object({ id: z.string(), updated_at: z.string().nullable(), created_at: z.string().nullable(), name: z.string(), description: z.string().nullable(), quantity: z.number().int().gte(-2147483648).lte(2147483647), price: z.string(), categoryId: z.string().nullable(), sku: z.string().nullable(), isActive: z.boolean().nullable(), supplier: z.string().nullable(), location: z.string().nullable(), weight: z.string().nullable(), dimensions: z.string().nullable(), tags: z.array(z.string()).nullable() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Inventory update validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Inventory update internal server error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "delete",
		path: "/api/inventory",
		alias: "deleteApiinventory",
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
				description: `Inventory deletion validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 404,
				description: `Inventory deletion not found error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Inventory deletion internal server error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "get",
		path: "/api/inventory/:id",
		alias: "getApiinventory_id",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string()
			},
		],
		response: z.object({ result: z.object({ id: z.string(), updated_at: z.string().nullable(), created_at: z.string().nullable(), name: z.string(), description: z.string().nullable(), quantity: z.number().int().gte(-2147483648).lte(2147483647), price: z.string(), categoryId: z.string().nullable(), sku: z.string().nullable(), isActive: z.boolean().nullable(), supplier: z.string().nullable(), location: z.string().nullable(), weight: z.string().nullable(), dimensions: z.string().nullable(), tags: z.array(z.string()).nullable() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
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

export const InventoryApi = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
