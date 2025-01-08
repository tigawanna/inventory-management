import express from "express";
import authRoute from "./auth/apis.ts";
import inventoryRoute from "./inventory/index.ts";
import swaggerJsdoc from "swagger-jsdoc";
import { apiReference } from "@scalar/express-api-reference";
import fs from "fs/promises";

const router = express.Router();

router.get("/docs", (req, res) => {
  const openapiSpecification = swaggerJsdoc({
    definition: {
      swagger: "2.0",
      // basePath: "/api/v1",
      info: {
        title: "Inventory v1 API",
        version: "1.0.0",
      },
      servers: [
        {
          url: "/api/v1",
        },
      ],
    },
    apis: ["./src/api/v1/*.ts"],
  });
  res.json(openapiSpecification);
});
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

export default router;
