import type { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import {
  generateUserAuthTokens,
  getAccessTokenFromCokkieOrHeaders,
  isRefreshTokenCokkiePresent,
  verifyRefreshToken,
} from "@/services/jwt-service.ts";
import type { UserJWTPayload } from "@/schemas/user-schema.ts";
import { errorCodes } from "@/schemas/shared-schema.ts";

/**
 * Middleware to authenticate a user.
 *
 * Extracts the token from the `Authorization` header and verifies it using the
 * `JWT_SECRET` environment variable. If the token is valid, it sets the `user`
 * property on the request object to the decoded token and calls the next
 * middleware function. If the token is invalid or missing, it returns a 401
 * response with an error message.
 *
 *@example
 *```ts
 * import { authenticate } from './middleware/auth';
 *
 * app.use('/protected-route', authenticate, (req, res) => {
 *   res.json({
 *     message: 'Access granted',
 *     user: req.user,
 *   });
 * });
 * ```
 *
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const decodedUser = await getAccessTokenFromCokkieOrHeaders(req);
  if (!decodedUser) {
    const refreshTokenPresent = isRefreshTokenCokkiePresent(req);
    if (!refreshTokenPresent) {
      return res
        .status(401)
        .json({ message: "No token provided", code: errorCodes.loginRequired });
    }
    const userFromRefreshToken = await verifyRefreshToken(req, res);
    await generateUserAuthTokens(res, userFromRefreshToken as UserJWTPayload);
    req.user = userFromRefreshToken as UserJWTPayload;
    return next();
  }
  req.user = decodedUser;
  return next();
};

export const authenticateAdminOnly = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const decodedUser = await getAccessTokenFromCokkieOrHeaders(req);
  if (!decodedUser) {
    const refreshTokenPresent = isRefreshTokenCokkiePresent(req);
    if (!refreshTokenPresent) {
      return res
        .status(401)
        .json({ message: "No token provided", code: errorCodes.loginRequired });
    }
    const userFromRefreshToken = (await verifyRefreshToken(
      req,
      res,
    )) as UserJWTPayload;
    // console.log({userFromRefreshToken});
    await generateUserAuthTokens(res, userFromRefreshToken as UserJWTPayload);
    if (userFromRefreshToken?.role && userFromRefreshToken?.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized", code: errorCodes.adminRequired });
    }
    req.user = userFromRefreshToken as UserJWTPayload;
    return next();
  }
  if (decodedUser?.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Unauthorized", code: errorCodes.adminRequired });
  }
  req.user = decodedUser;
  return next();
};

export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.flatten() });
      }
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      res.status(400).json({ error });
    }
  };
};
