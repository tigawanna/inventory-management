import express from "express";
import authRoute from "./v1/auth/apis.ts";
import inventoryRoute from "./v1/inventory/index.ts";

const router = express.Router();
router.get<{}, { message: string }>("/", (req, res) => {
  res.json({
    message: "welcome to v1 api",
  });
});
router.use("/auth", authRoute);
router.use("/inventory", inventoryRoute);

export default router;
