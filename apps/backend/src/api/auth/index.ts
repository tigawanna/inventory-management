import express from 'express';
import type MessageResponse from '../../interfaces/MessageResponse.ts';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: "its auth time",
  });
});



export default router;
