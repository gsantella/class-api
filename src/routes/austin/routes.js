import { Router } from 'express';
import { Sequelize, DataTypes } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false, // hides the SQL spam; set to console.log to see queries
});

const teams = {
    "Arizona Cardinals": {
      "city": "Glendale",
      "state": "Arizona",
      "stadium": "State Farm Stadium",
      "conference": "NFC",
      "division": "West"
    },
    "Atlanta Falcons": {
      "city": "Atlanta",
      "state": "Georgia",
      "stadium": "Mercedes-Benz Stadium",
      "conference": "NFC",
      "division": "South"
    },
    "Baltimore Ravens": {
      "city": "Baltimore",
      "state": "Maryland",
      "stadium": "M&T Bank Stadium",
      "conference": "AFC",
      "division": "North"
    }
    
  };
  const facts = {
    "Arizona Cardinals": [
      "The Arizona Cardinals are the oldest continuously run professional football team in the United States.",
      "The team was founded in 1898 in Chicago, Illinois, and has since moved to St. Louis and then to Arizona.",
      "The Cardinals have won two NFL championships, in 1925 and 1947."
    ],
    "Atlanta Falcons": [
      "The Atlanta Falcons were established in 1965 and began play in the NFL in 1966.",
      "The team has made two Super Bowl appearances, in 1998 and 2016, but has yet to win a championship.",
      "The Falcons' mascot is a falcon named Freddie."
    ],
    "Baltimore Ravens": [
      "The Baltimore Ravens were established in 1996 after the Cleveland Browns relocated to Baltimore.",
      "The team has won two Super Bowl championships, in 2000 and 2012.",
      "The Ravens are known for their strong defense and have produced several Hall of Fame players."
    ]
  };

const Teams = sequelize.define('Teams', {
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stadium: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conference: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  division: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const TeamFacts = sequelize.define('TeamFacts', {
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  facts: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
try {
  await sequelize.authenticate();
  await sequelize.sync();
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
const router = Router();

async function populateDatabase() {
  for (const [teamName, teamData] of Object.entries(teams)) {
    await Teams.findOrCreate({ where: { teamName }, defaults: teamData });
  }
  for (const [teamName, teamFacts] of Object.entries(facts)) {
    await TeamFacts.findOrCreate({
      where: { teamName },
      defaults: { facts: teamFacts.join('\n') },
    });
  }
}

await populateDatabase();



router.get("/", (req, res) => {
  res.send("Welcome to NFL Facts API - Austin Emig!");
});

router.get("/refresh", (req, res) => {
  res.send("I didn't restart the server");
});

router.get("/randomColor", (req, res) => {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"
    , "pink", "brown", "black", "white", "gray", "cyan", "magenta", "lime", "teal", "indigo", "violet", "gold", "silver", "bronze"
    , "maroon", "navy", "olive", "peach", "salmon", "turquoise", "lavender", "beige", "coral", "mint", "plum", "tan", "chocolate"
    , "crimson", "fuchsia", "khaki", "mustard", "saffron", "scarlet", "amber", "apricot", "cerulean", "cobalt", "emerald"
    , "jade", "sapphire", "topaz", "ultramarine", "vermilion", "viridian", "wisteria", "zinnia"
    , "aquamarine", "blush", "carmine", "champagne", "citrine", "ebony", "flax", "heliotrope", "ivory", "jade green"
    , "lavender blush", "lemon", "lilac", "magenta haze", "mauve", "ochre", "pearl", "periwinkle", "rose", "ruby"
    , "sangria", "sepia", "tangerine", "taupe", "thistle", "tulip", "umber", "vermilion red"
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  res.send(`${randomColor}`);
});

router.get("/hotsauce", (req, res) => {
  const typesOfHotSauce = req.query.type;
  if (!typesOfHotSauce) {
    return res.status(400).send("Please provide a type of hot sauce in the query parameter.");
  } else {
    res.send(`You must like ${typesOfHotSauce} hot sauce!`);
  }
});

router.get("/teams", async (req, res)  => {
  const allTeams = await Teams.findAll();
  res.json(allTeams);
});

router.get("/team/:teamName", async (req, res) => {
  const teamName = req.params.teamName;
  const team = await Teams.findOne({ where: { teamName } });
  if (!team) {
    return res.status(404).json({ error: "Team not found" });
  }
  res.json(team);
})
router.get("/teamFacts", async (req, res) => {
  const allFacts = await TeamFacts.findAll();
  res.json(allFacts.map(f => ({ teamName: f.teamName, facts: f.facts.split('\n') })));
});

router.get("/teamFacts/:teamName",  async (req, res) => {
  const teamName = req.params.teamName;
  const teamFacts = await TeamFacts.findOne({ where: { teamName } });

  if (!teamFacts) {
    return res.status(404).json({ error: "Team not found" });
  }
  res.json({ teamName, facts: teamFacts.facts.split('\n') });
});

router.post("/team", async (req, res) => {
  const { teamName, city, state, stadium, conference, division } = req.body;

  console.log("Received team data:", req.body);

  if (!teamName || !city || !state || !stadium || !conference || !division) {
  return res.status(400).json({ error: "Missing required fields" });
  }

  if( teams[teamName]) {
    return res.status(409).json({ error: "Team already exists" });
  }
  try {
    const newTeam = await Teams.create({ teamName, city, state, stadium, conference, division });
    res.status(201).json({ message: "Team added successfully", team: newTeam });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: "Team already exists" });
    }
    res.status(500).json({ error: "Database error" });
  }
});

router.put("/team/:teamName",  async (req, res) => {
  const { city, state, stadium, conference, division } = req.body;
  if (!city || !state || !stadium || !conference || !division) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const team = await Teams.findOne({ where: { teamName: req.params.teamName } });
  if (!team) return res.status(404).json({ error: "Team not found" });

  await team.update({ city, state, stadium, conference, division });
  res.json({ message: "Team updated successfully", team });
});

router.delete("/team/:teamName", async (req, res) => {
  const deleted = await Teams.destroy({ where: { teamName: req.params.teamName } });
  if (!deleted) return res.status(404).json({ error: "Team not found" });
  res.json({ message: "Team deleted successfully" });
});

let favoriteTeam = "Steelers";

router.get("/favoriteTeam", (req, res) => {
  res.json({ favoriteTeam });
});

router.post("/favoriteTeam", (req, res) => {
  const { teamName } = req.body;

  if (!teamName) {
    return res.status(400).json({ error: "Missing teamName in request body" });
  }

  favoriteTeam = teamName;
  res.json({ message: "Favorite team updated successfully", favoriteTeam });
});

router.put("/favoriteTeam", (req, res) => {
  const { teamName } = req.body;

  if (!teamName) {
    return res.status(400).json({ error: "Missing teamName in request body" });
  }

  favoriteTeam = teamName;
  res.json({ message: "Favorite team updated successfully", favoriteTeam });
});

router.delete("/favoriteTeam", (req, res) => {
  favoriteTeam = "";
  res.json({ message: "Favorite team deleted successfully" });
});

export default router;