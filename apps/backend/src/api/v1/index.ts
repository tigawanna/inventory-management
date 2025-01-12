import express from "express";
import authRoute from "./auth/apis.ts";
import inventoryRoute from "./inventory/index.ts";
import categoryRoute from "./category/index.ts";
import usersRoute from "./users/index.ts";
import auditLogsRoute from "./audit/index.ts";
import mailRoute from "./mail/index.ts";
import { apiReference } from "@scalar/express-api-reference";
import fs from "fs/promises";

const router = express.Router();


router.get("/openapi.json", async (req, res) => {
  try {
    const readFile = await fs.readFile("./openapi.json");
    res.json(JSON.parse(readFile.toString()));
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(400).json({ error });
  }
});
router.use(
  "/ui",
  apiReference({
    // basePath: "/api/v1",
    spec: {
      theme: "saturn",
      // url: "/api/v1/docs",
      url: "./openapi.json",
      baseUrl: "/api/v1",
    },
  }),
);

router.use("/auth", authRoute);
router.use("/items", inventoryRoute);
router.use("/categories", categoryRoute);
router.use("/audit-logs", auditLogsRoute);
router.use("/users", usersRoute);
router.use("/mail", mailRoute);

export default router;
