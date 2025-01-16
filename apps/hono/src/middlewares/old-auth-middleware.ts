import type { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import {
  clearAccessTokenCookie,
  clearRefreshTokenCookie,
  generateUserAuthTokens,
  getAccessTokenFromCokkieOrHeaders,
  isRefreshTokenCokkiePresent,
  verifyRefreshToken,
} from "@/services/jwt-service.ts";
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
  adminOnly = false,
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
    if (userFromRefreshToken.error) {
      await clearAccessTokenCookie(res);
      await clearRefreshTokenCookie(res, req?.user?.id);
      return res.status(403).json(userFromRefreshToken.error);
    }
    if (!userFromRefreshToken.result) {
      await clearAccessTokenCookie(res);
      await clearRefreshTokenCookie(res, req.user.id);
      return res
        .status(403)
        .json({ message: "Unauthorized", code: errorCodes.adminRequired });
    }
    if (
      adminOnly &&
      userFromRefreshToken?.result.role &&
      userFromRefreshToken?.result.role !== "admin"
    ) {
      await clearAccessTokenCookie(res);
      await clearRefreshTokenCookie(res, req.user.id);
      return res
        .status(403)
        .json({ message: "Unauthorized", code: errorCodes.adminRequired });
    }
    await generateUserAuthTokens(res, userFromRefreshToken.result);
    req.user = userFromRefreshToken.result;
    return next();
  }
  req.user = decodedUser;
  return next();
};

// export const authenticateAdminOnly = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const decodedUser = await getAccessTokenFromCokkieOrHeaders(req);
//   if (!decodedUser) {
//     // No access token, check refresh token
//     const refreshTokenPresent = isRefreshTokenCokkiePresent(req);
//     // console.log("===  refreshTokenPresent ==== ", refreshTokenPresent);
//     if (!refreshTokenPresent) {
//       return res
//         .status(401)
//         .json({ message: "No token provided", code: errorCodes.loginRequired });
//     }
//     // Verify refresh token and generate new tokens
//     const userFromRefreshToken = await verifyRefreshToken(req, res);
//     if (userFromRefreshToken.error) {
//       res.status(403);
//       return res.json(userFromRefreshToken.error);
//     }
//     if (!userFromRefreshToken.result) {
//       res.status(403);
//       return res.json({
//         message: "Unauthorized",
//         code: errorCodes.adminRequired,
//       });
//     }
//     if (
//       userFromRefreshToken?.result.role &&
//       userFromRefreshToken?.result.role !== "admin"
//     ) {
//       return res
//         .status(403)
//         .json({ message: "Unauthorized", code: errorCodes.adminRequired });
//     }
//     // Generate new tokens before setting user
//     await generateUserAuthTokens(res, userFromRefreshToken.result);
//     req.user = userFromRefreshToken.result;
//     next();
//   }

//   if (decodedUser?.role !== "admin") {
//     res
//       .status(403)
//       .json({ message: "Unauthorized", code: errorCodes.adminRequired });
//     return;
//   }
//   req.user = decodedUser;
//   return next();
// };

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
