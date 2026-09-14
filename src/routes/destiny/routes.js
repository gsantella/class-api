import { Router } from 'express';

const router = Router();

router.get("/", (req, res) => {
  res.send("Destiny!")
});

export default router;