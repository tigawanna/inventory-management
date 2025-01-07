import jwt from "jsonwebtoken";
const { verify } = jwt;
import type { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { envVariables } from "@/env.ts";
import { isRefreshTokenCokkiePresent } from "@/services/jwt-service.ts";
import type { UserJWTPayload } from "@/schemas/user-schema.ts";


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
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  const refreshTokenPresent = isRefreshTokenCokkiePresent(req);
  if (!token) {
    if (refreshTokenPresent) {
      return res.status(401).json({ message: "No token provided",action:"login" });
    }
    return res.status(401).json({ message: "No token provided",action:"refresh-token" });
  }
  try {
    const decoded = verify(token,envVariables.ACCESS_TOKEN_SECRET);
    req.user = decoded as any;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token",action:"refresh-token" });
  }
};


export const authenticateAdminOnly = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  const refreshTokenPresent = isRefreshTokenCokkiePresent(req);
  if (!token) {
    if (refreshTokenPresent) {
      return res.status(401).json({ message: "No token provided",action:"login" });
    }
    return res.status(401).json({ message: "No token provided",action:"refresh-token" });
  }
  try {
    const decoded = verify(
      token,
      envVariables.ACCESS_TOKEN_SECRET,
    ) as UserJWTPayload;
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized",action:"admin" });
    }
    req.user = decoded ;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token",action:"refresh-token" });
  }
};



export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if(error instanceof ZodError){
        res.status(400).json({ error: error.flatten() });
      }
      if(error instanceof Error){
        return res.status(400).json({ error: error.message });
      }
      res.status(400).json({ error });
    }
  };
};
