import { Router } from 'express';

const router = Router();

router.get("/", (req, res) => {
  res.send("Guido Santella!")
});

export default router;