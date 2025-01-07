import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  res.json({
    message: "its register time",
  });
});

export default router;
