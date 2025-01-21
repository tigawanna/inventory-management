import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";




const postApiusers_Body = z.object({ id: z.string().optional(), updated_at: z.string().nullish(), created_at: z.string().nullish(), name: z.string(), email: z.string(), password: z.string(), avatarUrl: z.string().nullish(), role: z.enum(["admin", "user"]).nullish(), refreshToken: z.string().nullish(), refreshTokenVersion: z.number().int().gte(-2147483648).lte(2147483647).nullish(), verificationToken: z.string().nullish(), isEmailVerified: z.boolean().nullish() }).strict().passthrough();
const patchApiusers_Body = z.object({ id: z.string(), updated_at: z.string().nullish(), created_at: z.string().nullish(), name: z.string().optional(), email: z.string().optional(), password: z.string().optional(), avatarUrl: z.string().nullish(), role: z.enum(["admin", "user"]).nullish(), refreshToken: z.string().nullish(), refreshTokenVersion: z.number().int().gte(-2147483648).lte(2147483647).nullish(), verificationToken: z.string().nullish(), isEmailVerified: z.boolean().nullish() }).strict().passthrough();

export const schemas = {
	postApiusers_Body,
	patchApiusers_Body,
};

const endpoints = makeApi([
	{
		method: "get",
		path: "/api/users",
		alias: "getApiusers",
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
		response: z.object({ result: z.object({ page: z.number().nullable(), perPage: z.number().nullable(), totalItems: z.number().nullable(), totalPages: z.number().nullable(), items: z.array(z.object({ id: z.string(), updated_at: z.string().nullable(), created_at: z.string().nullable(), name: z.string(), email: z.string(), avatarUrl: z.string().nullable(), role: z.enum(["admin", "user"]).nullable(), isEmailVerified: z.boolean().nullable() }).strict().passthrough()) }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Inventpry listing validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Inventpry listing internal server error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "post",
		path: "/api/users",
		alias: "postApiusers",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postApiusers_Body
			},
			{
				name: "Authorization",
				type: "Header",
				schema: z.string().optional()
			},
		],
		response: z.object({ result: z.object({ id: z.string(), updated_at: z.string().nullable(), created_at: z.string().nullable(), name: z.string(), email: z.string(), password: z.string(), avatarUrl: z.string().nullable(), role: z.enum(["admin", "user"]).nullable(), refreshToken: z.string().nullable(), refreshTokenVersion: z.number().int().gte(-2147483648).lte(2147483647).nullable(), verificationToken: z.string().nullable(), isEmailVerified: z.boolean().nullable() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Users creation validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Users creation internal server error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "patch",
		path: "/api/users",
		alias: "patchApiusers",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: patchApiusers_Body
			},
			{
				name: "Authorization",
				type: "Header",
				schema: z.string().optional()
			},
		],
		response: z.object({ result: z.object({ id: z.string(), updated_at: z.string().nullable(), created_at: z.string().nullable(), name: z.string(), email: z.string(), password: z.string(), avatarUrl: z.string().nullable(), role: z.enum(["admin", "user"]).nullable(), refreshToken: z.string().nullable(), refreshTokenVersion: z.number().int().gte(-2147483648).lte(2147483647).nullable(), verificationToken: z.string().nullable(), isEmailVerified: z.boolean().nullable() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Users update validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Users update internal server error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "delete",
		path: "/api/users",
		alias: "deleteApiusers",
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
				description: `Users deletion validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 404,
				description: `Users deletion not found error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Users deletion internal server error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "get",
		path: "/api/users/:id",
		alias: "getApiusers_id",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string()
			},
		],
		response: z.object({ result: z.object({ id: z.string(), updated_at: z.string().nullable(), created_at: z.string().nullable(), name: z.string(), email: z.string(), password: z.string(), avatarUrl: z.string().nullable(), role: z.enum(["admin", "user"]).nullable(), refreshToken: z.string().nullable(), refreshTokenVersion: z.number().int().gte(-2147483648).lte(2147483647).nullable(), verificationToken: z.string().nullable(), isEmailVerified: z.boolean().nullable() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Inventpry by id validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 404,
				description: `Inventpry by id not found error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Inventpry by id internal server error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
]);

export const UsersApi = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
