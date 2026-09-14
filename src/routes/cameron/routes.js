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
    //name = Bumbleflower's Sharepot
    //cost = {2}
    //type = artifact
    //rules =   When this artifact enters, create a Food token. (It’s an artifact with “{2}, {T}, Sacrifice this token: You gain 3 life.”)
    //          {5}, {T}, Sacrifice this artifact: Destroy target nonland permanent. Activate only as a sorcery.
    //flavor = “I may have overestimated the portions.”
    //illustrator =  J.P. Targete
    //bool legality[] = [true, true, true, true, true, true, true, true, true, true, true, false]
});

router.get("/card/blc/3", (req, res) => {
    res.send("I will send ms-bumbleflower")
    //name = Ms. Bumbleflower
    //cost = {1}{G}{W}{B}
    //type = Legendary Creature — Rabbit Citizen 
    //rules =   Vigilance
    //          Whenever you cast a spell, target opponent draws a card. Put a +1/+1 counter on target creature. It gains flying until end of turn. If this is the second time this ability has resolved this turn, you draw two cards.
    //power = 1
    //toughness = 5
    //illustrator = Marta Nael
    //bool legality[] = [false, false, false, true, true, true, false, false, false, false, false, false, false]
});

router.get("/card", (req, res) => {
    res.send("I should route to a card search")
});

router.get("/barbeque", (req, res) => {
    res.send("ribs")
});

export default router;