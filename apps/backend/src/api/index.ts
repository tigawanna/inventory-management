import express from "express";
import authRoute from "./v1/auth/apis.ts";
import inventoryRoute from "./v1/inventory/index.ts";

const router = express.Router();
/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get<{}, { message: string }>("/", (req, res) => {
  res.json({
    message: "welcome to v1 api",
  });
});
router.use("/auth", authRoute);
router.use("/inventory", inventoryRoute);

export default router;
