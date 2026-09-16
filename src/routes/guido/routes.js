import { Router } from 'express';

const router = Router();

router.get("/", (req, res) => {
  res.send("Guido Santella!")
});

router.get("/refresh", (req, res) => {
  res.send("I didn't restart the server")
});

export default router;