import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";




const postApiauthsignup_Body = z.object({ name: z.string(), email: z.string(), password: z.string() }).strict().passthrough();
const postApiauthverifyEmail_Body = z.object({ email: z.string().email(), token: z.string() }).partial().strict().passthrough();
const postApiauthsignin_Body = z.object({ email: z.string().email(), password: z.string() }).strict().passthrough();
const postApiauthresetPassword_Body = z.object({ token: z.string(), newPassword: z.string() }).strict().passthrough();

export const schemas = {
	postApiauthsignup_Body,
	postApiauthverifyEmail_Body,
	postApiauthsignin_Body,
	postApiauthresetPassword_Body,
};

const endpoints = makeApi([
	{
		method: "post",
		path: "/api/auth/signup",
		alias: "postApiauthsignup",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postApiauthsignup_Body
			},
		],
		response: z.object({ result: z.object({ id: z.string(), updated_at: z.string().nullable(), created_at: z.string().nullable(), name: z.string(), email: z.string(), avatarUrl: z.string().nullable(), role: z.enum(["admin", "user"]).nullable(), refreshTokenVersion: z.number().int().gte(-2147483648).lte(2147483647).nullable(), isEmailVerified: z.boolean().nullable() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `User signup validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 404,
				description: `User signup not found error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `User signup internal error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "post",
		path: "/api/auth/verify-email",
		alias: "postApiauthverifyEmail",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postApiauthverifyEmail_Body
			},
		],
		response: z.object({ result: z.object({ id: z.string(), updated_at: z.string().nullable(), created_at: z.string().nullable(), name: z.string(), email: z.string(), avatarUrl: z.string().nullable(), role: z.enum(["admin", "user"]).nullable(), refreshTokenVersion: z.number().int().gte(-2147483648).lte(2147483647).nullable(), isEmailVerified: z.boolean().nullable() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Email verification validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 404,
				description: `Email verification errorr : User not found`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ code: z.string(), message: z.string() }).strict().passthrough() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Email verification internal error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "post",
		path: "/api/auth/request-email-verification",
		alias: "postApiauthrequestEmailVerification",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ email: z.string().email() }).strict().passthrough()
			},
		],
		response: z.object({ result: z.object({ message: z.string() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Email verification request validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 404,
				description: `Email verification request errorr : User not found`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ code: z.string(), message: z.string() }).strict().passthrough() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Email verification request internal error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "post",
		path: "/api/auth/signin",
		alias: "postApiauthsignin",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postApiauthsignin_Body
			},
		],
		response: z.object({ result: z.object({ id: z.string(), updated_at: z.string().nullable(), created_at: z.string().nullable(), name: z.string(), email: z.string(), avatarUrl: z.string().nullable(), role: z.enum(["admin", "user"]).nullable(), refreshTokenVersion: z.number().int().gte(-2147483648).lte(2147483647).nullable(), isEmailVerified: z.boolean().nullable() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `User signin validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `User signin internal error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "post",
		path: "/api/auth/request-password-reset",
		alias: "postApiauthrequestPasswordReset",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ email: z.string().email() }).strict().passthrough()
			},
		],
		response: z.object({ result: z.object({ message: z.string() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Password reset request validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 404,
				description: `Password reset request errorr : User not found`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ code: z.string(), message: z.string() }).strict().passthrough() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Password reset request internal error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "post",
		path: "/api/auth/reset-password",
		alias: "postApiauthresetPassword",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postApiauthresetPassword_Body
			},
		],
		response: z.object({ result: z.object({ message: z.string() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Password reset validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 404,
				description: `Password reset errorr : User not found`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ code: z.string(), message: z.string() }).strict().passthrough() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Password reset internal error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "post",
		path: "/api/auth/signout",
		alias: "postApiauthsignout",
		requestFormat: "json",
		response: z.object({ result: z.object({ message: z.string() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `User signed out validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `User signed out internal error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
	{
		method: "get",
		path: "/api/auth/me",
		alias: "getApiauthme",
		requestFormat: "json",
		response: z.object({ result: z.object({ id: z.string(), updated_at: z.string().nullable(), created_at: z.string().nullable(), name: z.string(), email: z.string(), avatarUrl: z.string().nullable(), role: z.enum(["admin", "user"]).nullable(), refreshTokenVersion: z.number().int().gte(-2147483648).lte(2147483647).nullable(), isEmailVerified: z.boolean().nullable() }).strict().passthrough(), error: z.unknown().nullish() }).strict().passthrough(),
		errors: [
			{
				status: 400,
				description: `Current user validation error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 404,
				description: `Current user not found error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
			{
				status: 500,
				description: `Current user internal error`,
				schema: z.object({ result: z.unknown().nullish(), error: z.object({ message: z.string(), code: z.enum(["login-required", "admin-required", "parameters-required", "query-parametersRequired-required", "payload-required", "internal-server-error", "not-found"]).optional(), data: z.record(z.object({ code: z.string(), message: z.string() }).strict().passthrough()).optional() }).strict().passthrough().nullable() }).strict().passthrough()
			},
		]
	},
]);

export const AuthApi = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
