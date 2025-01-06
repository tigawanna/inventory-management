import type { MessageResponse } from '@/interfaces/Responses.ts';
import express from 'express';


const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: "its inventory time",
  });
});



export default router;
