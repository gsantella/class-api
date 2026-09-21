import { Router } from 'express';
//bloomburrow
import blb from "./cards/blb.json" with { type: "json" };
//bloomburrow commander
import blc from "./cards/blc.json" with { type: "json" };

const router = Router();

router.get("/", (req, res) => {
    res.send("You've reached the Cameron Lynch API, how may I help you?")
});

//colors!

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

router.get("/color", (req, res) => {
    res.send(colors[Math.floor(Math.random() * colors.length)]);
});

//cards section

router.get("/card/blb/:id", (req, res) => {
    const { id } = req.params;
    const foundCard = blb.find((p) => p.id === id);
    if (!foundCard) {
        return res.status(404).send("Card not found");
    }
    res.json(foundCard);
});

router.get("/card/blc/:id", (req, res) => {
    const { id } = req.params;
    const foundCard = blc.find((p) => p.id === id);
    if (!foundCard) {
        return res.status(404).send("Card not found");
    }
    res.json(foundCard);
});

router.get("/card", (req, res) => {
    res.send("I should route to a card search")
});

router.post('/post', (req, res) => {
  res.send('I will be a POST');
});

router.put('/put', (req, res) => {
  res.send('I will be a PUT.');
});

router.delete('/delete', (req, res) => {
  res.send('I will be a DELETE.');
});

//

router.get("/hotsauce", (req, res) => {
  const typeOfHotSauce = req.query.type 
  if (typeOfHotSauce) {
    res.send(`You must like ${typeOfHotSauce} hot sauce`)
  } else {
    res.send(`Query String Please!`)
  }
});

export default router;