import express from "express";
import authRoute from "./auth/index";
import inventoryRoute from "./inventory/index";

const router = express.Router();
router.get<{}, { message: string }>("/", (req, res) => {
  res.json({
    message: "welcome to v1 api",
  });
})
router.use("/auth", authRoute);
router.use("/inventory", inventoryRoute);

export default router;
