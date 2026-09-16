import { Router } from 'express';

const router = Router();

router.get("/", (req, res) => {
  res.send("Guido Santella!")
});

router.get("/hotsauce", (req, res) => {
  const typeOfHotSauce = req.query.type
  if (typeOfHotSauce) {
    res.send(`You must like ${typeOfHotSauce} hot sauce!`)
  } else {
    res.send("Query String Please!")
  }
 
});

export default router;