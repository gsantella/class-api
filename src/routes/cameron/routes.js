import { Router } from 'express';

const router = Router();

router.get("/", (req, res) => {
    res.send("Cameron Lynch.")
});


// figure out how to do nested info like latitude and longitude in iss_position
// or, specifically, a nested url GET such that:
// */blc/3 gives 'ms bumbleflower'
// */blb/244 gives 'bumbleflower's sharepot'
// return Card Name, Cost, Type, Rules Text, Flavor Text(nullable), P/T (nullable), illustrator, card legality boolean list.
// card type may need to be split into super type and sub type, nullable

// rough version

router.get("/card/blb/244", (req, res) => {
    res.send("I will send bumbleflowers-sharepot")
});

router.get("/card/blc/3", (req, res) => {
    res.send("I will send ms-bumbleflower")
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

export default router;