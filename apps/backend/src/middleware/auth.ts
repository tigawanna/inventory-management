import { verify } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

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

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};



export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      res.status(400).json({ error });
    }
  };
};
