import { Router } from 'express';
import {Pokemon,Team,TeamPokemon
} from '../../playground/deandre/orm.js';

const router = Router();

router.get("/", (req, res) => {
    res.send("Pokemon");
});


//Grabs Pokemon By ID or Name
router.get("/pokemon/:id", async (req, res) => {
    const { id } = req.params;

    try {
        let foundPokemon;

        if (!isNaN(id)) {
            foundPokemon = await Pokemon.findByPk(Number(id));
        } else {
            foundPokemon = await Pokemon.findOne({
                where: {
                    name: id.toLowerCase()
                }
            });
        }

        if (!foundPokemon) {
            return res.status(404).send("Pokemon not found");
        }

        res.json(foundPokemon);
    } catch (error) {
        console.error(error);
        res.status(500).send("Database error");

        
    }
});

//Grabs Pokemon Team By User ID
router.get("/pokemon/team/:UserId", async (req, res) => {
    const { UserId } = req.params;

    try {
        const team = await Team.findOne({
            where: {
                userId: UserId
            }
        });

        if (!team) {
            return res.status(404).send("Team does not exist.");
        }

        const teamPokemon = await TeamPokemon.findAll({
            where: {
                userId: UserId
            },
            order: [
                ['slot', 'ASC']
            ]
        });

        const fullTeam = [];

        for (const member of teamPokemon) {
            const pokemon = await Pokemon.findByPk(
                member.pokemonId
            );

            if (pokemon) {
                fullTeam[member.slot] = pokemon;
            }
        }

        res.json(fullTeam);
    } catch (error) {
        console.error(error);
        res.status(500).send("Database error");
    }
});

//Creates a new Pokemon Team for a User ID
router.post("/pokemon/team/:UserId", async (req, res) => {
    const { UserId } = req.params;

    try {
        const existingTeam = await Team.findOne({
            where: {
                userId: UserId
            }
        });

        if (existingTeam) {
            return res.status(400).send(
                `User ID "${UserId}" already exists.`
            );
        }

        await Team.create({
            userId: UserId
        });

        res.send(
            `Team successfully created for user: ${UserId}`
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("Database error");
    }
});

//Adds a Pokemon to a User's Team
router.put("/pokemon/team/:UserId/:id", async (req, res) => {
    const { UserId, id } = req.params;

    try {
        const team = await Team.findOne({
            where: {
                userId: UserId
            }
        });

        if (!team) { // Checks if the user has a team before adding a Pokemon
            return res.status(404).send(
                `User ID "${UserId}" does not have a team.` 
            );
        }

        const pokemon = await Pokemon.findByPk(Number(id)); //Checks if the Pokemon exists before adding it to the team

        if (!pokemon) {
            return res.status(404).send("Pokemon not found.");
        }

        const teamSize = await TeamPokemon.count({
            where: {
                userId: UserId
            }
        });

        if (teamSize >= 6) { //Checks if the team is full before adding a new Pokemon
            return res.status(400).send(
                "Your team is full! (Max 6 Pokemon)"
            );
        }

        const existingPokemon = await TeamPokemon.findOne({
            where: {
                userId: UserId,
                pokemonId: pokemon.id
            }
        });

        if (existingPokemon) {
            return res.status(400).send(
                "That Pokemon is already on your team."
            );
        }

        await TeamPokemon.create({
            userId: UserId,
            pokemonId: pokemon.id,
            slot: teamSize
        });

        res.send(
            `Successfully added Pokemon ID #${pokemon.id} to ${UserId}'s team!`
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("Database error");
    }
});

router.delete("/pokemon/team/:UserId/:slot", async (req, res) => {
    const { UserId, slot } = req.params;

    const slotIndex = parseInt(slot, 10);

    if (isNaN(slotIndex) || slotIndex < 0 || slotIndex > 5) {
        return res.status(400).send(
            "Slot must be a number from 0 to 5."
        );
    }

    try {
        const teamPokemon = await TeamPokemon.findOne({
            where: {
                userId: UserId,
                slot: slotIndex
            }
        });

        if (!teamPokemon) {
            return res.status(404).send(
                "No Pokemon found in that slot."
            );
        }

        const removedPokemonId = teamPokemon.pokemonId;

        await teamPokemon.destroy();

        const remainingPokemon = await TeamPokemon.findAll({
            where: {
                userId: UserId
            },
            order: [
                ['slot', 'ASC']
            ]
        });

        for (let i = 0; i < remainingPokemon.length; i++) {
            await remainingPokemon[i].update({
                slot: i
            });
        }

        res.send(
            `Removed Pokemon ID #${removedPokemonId} from slot ${slotIndex}.`
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("Database error");
    }
});

router.put( // Adds a new user 
    "/pokemon/team/:UserId/change-id/:NewUserId",
    async (req, res) => {
        const { UserId, NewUserId } = req.params;

        try {
            const existingTeam = await Team.findOne({
                where: {
                    userId: NewUserId
                }
            });

            if (existingTeam) {
                return res.status(400).send(
                    `User ID "${NewUserId}" already exists.`
                );
            }

            const team = await Team.findOne({
                where: {
                    userId: UserId
                }
            });

            if (!team) {
                return res.status(404).send(
                    `User ID "${UserId}" does not exist.`
                );
            }

            await team.update({
                userId: NewUserId
            });

            await TeamPokemon.update(
                {
                    userId: NewUserId
                },
                {
                    where: {
                        userId: UserId
                    }
                }
            );

            res.send(
                `User ID successfully changed from "${UserId}" to "${NewUserId}".`
            );
        } catch (error) {
            console.error(error);
            res.status(500).send("Database error");
        }
    }
);

export default router;