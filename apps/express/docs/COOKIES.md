# Cookies auto clearing aftre browser refesh issue

This error is a combination of CORS issues and cokkie settings
to resolve this error you need to set your server to allow cookies and set the same origin policy to allow the frontend to make requests to your backend server.

cors

```ts
// cors-utils.ts
import type { Request, Response, NextFunction } from "express";

export function corsHeaders(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.origin) return next();
  if (allowedOrigins.includes(req.headers.origin)) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  }
}
export const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL ?? "",
];
```

```tsx
//  app.ts
app.use(corsHeaders);
app.use(
  cors({
    origin: (origin, callback) => {
      if ((origin && allowedOrigins.indexOf(origin) !== -1) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  }),
);
```

and create the cookies using the options

```tsx
import jwt from "jsonwebtoken";
const { sign, verify } = jwt;

const accessTokencookieOptions = {
      httpOnly: true,
      secure:true,
      sameSite: "none",
      path: "/",
      maxAge: 12 * 60 * 1000, // expires in 12 minutes
}

const accessTokebCookieKey = "rfsh-token";
  const fiftenMinutesInSeconds = Math.floor(Date.now() / 1000) + 60 * 15; // 15 minutes
  const accessToken = await sign(
    { ...sanitizedPayload, exp:  : fiftenMinutesInSeconds },
    ACCESS_TOKEN_SECRET,
  );
  res.clearCookie(accessTokebCookieKey, accessTokencookieOptions);
  res.cookie(accessTokebCookieKey, accessToken, accessTokencookieOptions);
```
