import { Router } from 'express';

const router = Router();

router.get("/", (req, res) => { 
    res.send("Brand New")
});

router.get("/band", (req, res) => { 
    res.send("Brand New is an American rock band from Long Island, New York.")
});

router.get("/formed", (req, res) => { 
    res.send("Brand New formed in 2000.")
});

router.get("/genre", (req, res) => { 
    res.send("Brand New is commonly associated with alternative rock, emo, and post-hardcore.")
});

// Albums will be updated to JSON
router.get("/albums", (req, res) => { 
    res.send("Brand New released five albums: Your Favorite Weapon, Deja Entendu, The Devil and God Are Raging Inside Me, Daisy, and Science Fiction.")
});

router.post("/albums", (req, res) => {
    res.send("I will create an album")
})

router.put("/albums", (req, res) => {
    res.send("I will update an album")
})

router.delete("/albums", (req, res) => {
    res.send("I will delete an album")
})

router.get("/members", (req, res) => { 
    res.send("The band's main members were Jesse Lacey, Vincent Accardi, Garrett Tierney, and Brian Lane.")
});

router.get("/refresh", (req, res) => {
  res.send("I didn't restart the server.")
})

router.get("/hotsauce", (req, res) => { 
    const typeOfHotSauce = req.query.type;
    if (typeOfHotSauce)
        res.send(`You must like ${typeOfHotSauce} hot sauce`)
      else
        res.send("Query String Please")
});

export default router;