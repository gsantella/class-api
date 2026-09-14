import { Router } from 'express';

const app = Router();

app.get("/", (req, res) => res.send("Pokemon"));

app.get("/pokemon/:id", (req, res) => {
    const { id } = req.params;
    const pokemon = pokemon.find((p) => p.id === id);
    if (!pokemon) {
        return res.status(404).send("Pokemon not found");
    }
    res.json(pokemon);
});

//#region Team Management
app.get("/pokemon/team/:UserId", (req, res) => {
    res.send("This will return a team of 6 pokemon the user selected");  
  // this will return a team of 6 pokemon the user selected
});

app.post("/pokemon/team/:UserId", (req, res) => {
  res.send("This will create a userID and a team of 6 pokemon the user selected");
    // this will create a userID and a team of 6 pokemon the user selected
});

app.put("/pokemon/team/:UserId/:id", (req, res) => {
  res.send("This will add a new pokemon the user selected to the team of 6 pokemon");
    // this will add a new pokemon the user selected to the team of 6 pokemon
});

app.delete("/pokemon/team/:UserId/:slot", (req, res) => {
  res.send("This will delete a pokemon the user selected from the team of 6 pokemon");
    // this will delete a pokemon the user selected from the team of 6 pokemon
});
//#endregion

export default app;