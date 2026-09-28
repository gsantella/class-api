import { Router } from 'express';
import pokemon from "./pokemon.json" with { type: "json" };

const router = Router();
const userTeams = {}; 

router.get("/", (req, res) => res.send("Pokemon"));

router.get("/pokemon/:id", (req, res) => {
    const { id } = req.params;

    const foundPokemon = pokemon.find(
        (p) =>
            p.id.toString() === id ||
            p.name.toLowerCase() === id.toLowerCase()
    );

    if (!foundPokemon) {
        return res.status(404).send("Pokemon not found");
    }

    res.json(foundPokemon);
});

//#region Team Management

router.get("/pokemon/team/:UserId", (req, res) => {
    const { UserId } = req.params;
    const teamIds = userTeams[UserId] || [];
    const fullTeamObjects = teamIds.map(id => pokemon.find(p => p.id === id));
    res.json(fullTeamObjects);
});
 
router.post("/pokemon/team/:UserId", (req, res) => {
    const { UserId } = req.params;
    userTeams[UserId] = [];
    res.send(`Team container successfully created for user: ${UserId}`);
});

router.put("/pokemon/team/:UserId/:id", (req, res) => {
    const { UserId, id } = req.params;

    if (!userTeams[UserId]) {
        userTeams[UserId] = [];
    }

    if (userTeams[UserId].length >= 6) {
        return res.status(400).send("Your team is full! (Max 6 Pokemon)");
    }

    userTeams[UserId].push(id);
    res.send(`Successfully added Pokemon ID #${id} to ${UserId}'s team!`);
});

router.delete("/pokemon/team/:UserId/:slot", (req, res) => {
    const { UserId, slot } = req.params;
    const slotIndex = parseInt(slot, 10);

    if (!userTeams[UserId] || !userTeams[UserId][slotIndex]) {
        return res.status(404).send("No Pokemon found in that slot index.");
    }

    const removedId = userTeams[UserId].splice(slotIndex, 1);
    res.send(`Removed Pokemon ID #${removedId} from slot ${slotIndex}.`);
});

//#endregion
export default router;
