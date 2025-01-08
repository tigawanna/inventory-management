/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/api/v1/auth/signup": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** signup */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description Successful response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": unknown;
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/forgot-password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** forgot password */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description Successful response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": unknown;
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/reset-password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** reset password */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description Successful response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": unknown;
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** me */
        get: {
            parameters: {
                query?: never;
                header?: {
                    /** @example kjz-rft=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxOTQ0MWJhLWZhMDktNzQ1ZC1hZDYzLWEzMTliMzc2ZmY0MSIsInVwZGF0ZWRfYXQiOm51bGwsImNyZWF0ZWRfYXQiOiIyMDI1LTAxLTA3VDIwOjA2OjAwLjM0MFoiLCJuYW1lIjoiZGVubmlzIiwiZW1haWwiOiJkZW5uaXNraW51dGhpYXdhd2VydUBnbWFpbC5jb20iLCJhdmF0YXJVcmwiOm51bGwsInJvbGUiOiJ1c2VyIiwicmVmcmVzaFRva2VuVmVyc2lvbiI6NiwiaXNFbWFpbFZlcmlmaWVkIjp0cnVlLCJleHAiOjE3MzY3MjI5MjgsImlhdCI6MTczNjI5MDkyOH0.LyVY4wJLyzYUHyFq-EKIIzqrfl4UQaRIUFmdq8pfAy0 */
                    Cookie?: string;
                    /** @example no-cache */
                    "Cache-Control"?: string;
                    /** @example <calculated when request is sent> */
                    "Postman-Token"?: string;
                    /** @example <calculated when request is sent> */
                    Host?: string;
                    /** @example PostmanRuntime/7.39.1 */
                    "User-Agent"?: string;
                    /** @example *\/* */
                    Accept?: string;
                    /** @example gzip, deflate, br */
                    "Accept-Encoding"?: string;
                    /** @example keep-alive */
                    Connection?: string;
                    /** @example Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxOTQ0MWJhLWZhMDktNzQ1ZC1hZDYzLWEzMTliMzc2ZmY0MSIsInVwZGF0ZWRfYXQiOm51bGwsImNyZWF0ZWRfYXQiOiIyMDI1LTAxLTA3VDIwOjA2OjAwLjM0MFoiLCJuYW1lIjoiZGVubmlzIiwiZW1haWwiOiJkZW5uaXNraW51dGhpYXdhd2VydUBnbWFpbC5jb20iLCJhdmF0YXJVcmwiOm51bGwsInJvbGUiOiJ1c2VyIiwicmVmcmVzaFRva2VuVmVyc2lvbiI6NSwiaXNFbWFpbFZlcmlmaWVkIjp0cnVlLCJleHAiOjE3MzYyOTA5ODgsImlhdCI6MTczNjI5MDkyOH0.xjZOz2DjRJNZP-5fJ1-8xl6HfQFkKUVnZuKvuL2sGlw */
                    Authorization?: string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Successful response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": unknown;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/refresh-token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** refresh-token */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Successful response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": unknown;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/signin": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** signin */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description Successful response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": unknown;
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/auth/verify-email": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** verify-email */
        post: {
            parameters: {
                query?: {
                    /** @example denniskinuthiaw@gmail.com */
                    email?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "*/*"?: never;
                };
            };
            responses: {
                /** @description Successful response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": unknown;
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/items": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** list */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Successful response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": unknown;
                    };
                };
            };
        };
        put?: never;
        /** create */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description Successful response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": unknown;
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/items/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Item ID */
                id: string;
            };
            cookie?: never;
        };
        /** view */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Item ID */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Successful response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": unknown;
                    };
                };
            };
        };
        /** update */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Item ID */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description Successful response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": unknown;
                    };
                };
            };
        };
        post?: never;
        /** delete */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Item ID */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Successful response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": unknown;
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: never;
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
