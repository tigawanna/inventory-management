import kvjs from "@heyputer/kv.js";
import type { Request, Response, NextFunction } from "express";
export function rateLimit(userid: string) {
  // in meory kv
  const kv = new kvjs();
  const rateLimit = kv.get(userid);
  if (rateLimit) {
    return true;
  }
  // set the rate limit for 100 seconds
  kv.expire(userid, 100);
  return false;
}


  export  function rateLimitMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
    routes: string[],
  ) {
    const currentpath = req.originalUrl;
    if (routes.includes(currentpath)) {
      const userid = req.user.id;
      const limit = rateLimit(userid);
      if (limit) {
        return res.status(429).json({ error: "Rate limit exceeded" });
      }
    }
    return next();
  };


