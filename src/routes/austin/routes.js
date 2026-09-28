import { Router } from 'express';

const router = Router();

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

router.get("/teams", (req, res) => {
  res.json(teams);
});

router.get("/team/:teamName", (req, res) => {
  const teamName = req.params.teamName;
  const team = teams[teamName];
  if (!team) {
    return res.status(404).json({ error: "Team not found" });
  }

  res.json({ teamName: teamName, ...team });
})
router.get("/teamFacts", (req, res) => {
  res.json(facts);
});

router.get("/teamFacts/:teamName", (req, res) => {
  const teamName = req.params.teamName;
  const teamFacts = facts[teamName];

  if (!teamFacts) {
    return res.status(404).json({ error: "Team not found" });
  }

  res.json({ teamName: teamName, facts: teamFacts });
});

router.post("/team", (req, res) => {
  const { teamName, city, state, stadium, conference, division } = req.body;

  console.log("Received team data:", req.body);

  if (!city || !state || !stadium || !conference || !division) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if( teams[teamName]) {
    return res.status(409).json({ error: "Team already exists" });
  }
  teams[teamName] = { city, state, stadium, conference, division };
  res.status(201).json({ message: "Team added successfully", team: teams[teamName] });
});

router.put("/team/:teamName", (req, res) => {
  const teamName = req.params.teamName;
  const { city, state, stadium, conference, division } = req.body;

  

  if( !teams[teamName]) {
    return res.status(404).json({ error: "Team not found" });
  }
  if( !city || !state || !stadium || !conference || !division) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  teams[teamName] = { city, state, stadium, conference, division };
  res.json({ message: "Team updated successfully", team: teams[teamName] });
});

router.delete("/team/:teamName", (req, res) => {
  const teamName = req.params.teamName;

  if (!teams[teamName]) {
    return res.status(404).json({ error: "Team not found" });
  }

  delete teams[teamName];
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