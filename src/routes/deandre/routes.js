import { Router } from 'express';
import pokemon from "./pokemon.json" with { type: "json" };

const router = Router();

router.get("/", (req, res) => res.send("Pokemon"));

router.get("/pokemon/:id", (req, res) => {
    const { id } = req.params;
    const foundPokemon = pokemon.find((p) => p.id === id);
    if (!foundPokemon) {
        return res.status(404).send("Pokemon not found");
    }
    res.json(foundPokemon);
});

//#region Team Management
router.get("/pokemon/team/:UserId", (req, res) => {
    res.send("This will return a team of 6 pokemon the user selected");  
  // this will return a team of 6 pokemon the user selected
});

router.post("/pokemon/team/:UserId", (req, res) => {
  res.send("This will create a userID and a team of 6 pokemon the user selected");
    // this will create a userID and a team of 6 pokemon the user selected
});

router.put("/pokemon/team/:UserId/:id", (req, res) => {
  res.send("This will add a new pokemon the user selected to the team of 6 pokemon");
    // this will add a new pokemon the user selected to the team of 6 pokemon
});

router.delete("/pokemon/team/:UserId/:slot", (req, res) => {
  res.send("This will delete a pokemon the user selected from the team of 6 pokemon");
    // this will delete a pokemon the user selected from the team of 6 pokemon
});
//#endregion

export default router;