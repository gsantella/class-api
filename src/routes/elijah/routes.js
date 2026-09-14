import { Router } from 'express';

const router = Router();

router.get("/", (req, res) => {
  res.send("Elijah!")
});

export default router;