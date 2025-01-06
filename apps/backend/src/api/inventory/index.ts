import express from 'express';
import type MessageResponse from '../../interfaces/MessageResponse.ts';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: "its inventory time",
  });
});



export default router;
