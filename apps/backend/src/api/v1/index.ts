import express from "express";
import authRoute from "./auth/apis.ts";
import inventoryRoute from "./inventory/index.ts";
import swaggerJsdoc from "swagger-jsdoc";
import { apiReference } from "@scalar/express-api-reference";

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

router.use(
  "/ui",
  apiReference({
    // basePath: "/api/v1",
    spec: {
      theme: "saturn",
      url: "/api/v1/docs",
      baseUrl: "/api/v1",
    },
  }),
);
/**
 * @openapi
 * /:
 *   get:
 *     summary: Returns a mysterious string
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get<{}, { message: string }>("/", (req, res) => {
  res.json({
    message: "welcome to v1 api",
  });
});
router.use("/auth", authRoute);
router.use("/inventory", inventoryRoute);

export default router;
