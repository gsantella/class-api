import { Router } from "express";
import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "brandnew.sqlite",
  logging: false,
});

const albums = {
  "Your Favorite Weapon": {
    releaseDate: "October 9, 2001",
    songs: [
      { trackTitle: "The Shower Scene", trackDuration: "2:24" },
      { trackTitle: "Jude Law and a Semester Abroad", trackDuration: "3:40" },
      { trackTitle: "Sudden Death in Carolina", trackDuration: "3:01" },
      { trackTitle: "Mix Tape", trackDuration: "3:57" },
      { trackTitle: "Failure by Design", trackDuration: "3:15" },
      { trackTitle: "Last Chance to Lose Your Keys", trackDuration: "3:25" },
      { trackTitle: "Logan to Government Center", trackDuration: "3:02" },
      { trackTitle: "The No Seatbelt Song", trackDuration: "4:29" },
      { trackTitle: "Seventy Times 7", trackDuration: "3:32" },
      { trackTitle: "Secondary", trackDuration: "3:01" },
      { trackTitle: "Magazines", trackDuration: "2:50" },
      { trackTitle: "Soco Amaretto Lime", trackDuration: "4:46" }
    ]
  },
  "Deja Entendu": {
    releaseDate: "June 17, 2003",
    songs: [
      { trackTitle: "Tatou", trackDuration: "1:42" },
      { trackTitle: "Sic Transit Gloria... Glory Fades", trackDuration: "3:06" },
      { trackTitle: "I Will Play My Game Beneath the Spin Light", trackDuration: "3:57" },
      { trackTitle: "Okay I Believe You, But My Tommy Gun Don't", trackDuration: "5:35" },
      { trackTitle: "The Quiet Things That No One Ever Knows", trackDuration: "4:01" },
      { trackTitle: "The Boy Who Blocked His Own Shot", trackDuration: "4:39" },
      { trackTitle: "Jaws Theme Swimming", trackDuration: "4:34" },
      { trackTitle: "Me vs. Maradona vs. Elvis", trackDuration: "5:19" },
      { trackTitle: "Guernica", trackDuration: "3:23" },
      { trackTitle: "Good to Know That If I Ever Need Attention All I Have to Do Is Die", trackDuration: "7:00" },
      { trackTitle: "Play Crack the Sky", trackDuration: "5:27" }
    ]
  },
  "The Devil and God Are Raging Inside Me": {
    releaseDate: "November 21, 2006",
    songs: [
      { trackTitle: "Sowing Season (Yeah)", trackDuration: "4:31" },
      { trackTitle: "Millstone", trackDuration: "4:16" },
      { trackTitle: "Jesus Christ", trackDuration: "5:18" },
      { trackTitle: "Degausser", trackDuration: "5:32" },
      { trackTitle: "Limousine (MS Rebridge)", trackDuration: "7:42" },
      { trackTitle: "You Won't Know", trackDuration: "5:42" },
      { trackTitle: "Welcome to Bangkok", trackDuration: "3:05" },
      { trackTitle: "Not the Sun", trackDuration: "3:09" },
      { trackTitle: "Luca", trackDuration: "5:08" },
      { trackTitle: "Untitled", trackDuration: "2:06" },
      { trackTitle: "The Archers Bows Have Broken", trackDuration: "4:14" },
      { trackTitle: "Handcuffs", trackDuration: "4:10" }
    ]
  },
  "Daisy": {
    releaseDate: "September 22, 2009",
    songs: [
      { trackTitle: "Vices", trackDuration: "3:24" },
      { trackTitle: "Bed", trackDuration: "3:10" },
      { trackTitle: "At the Bottom", trackDuration: "4:04" },
      { trackTitle: "Gasoline", trackDuration: "3:32" },
      { trackTitle: "You Stole", trackDuration: "6:00" },
      { trackTitle: "Be Gone", trackDuration: "1:31" },
      { trackTitle: "Sink", trackDuration: "3:20" },
      { trackTitle: "Bought a Bride", trackDuration: "3:07" },
      { trackTitle: "Daisy", trackDuration: "3:06" },
      { trackTitle: "In a Jar", trackDuration: "3:06" },
      { trackTitle: "Noro", trackDuration: "6:27" }
    ]
  },
  "Science Fiction": {
    releaseDate: "August 17, 2017",
    songs: [
      { trackTitle: "Lit Me Up", trackDuration: "6:17" },
      { trackTitle: "Can't Get It Out", trackDuration: "3:43" },
      { trackTitle: "Waste", trackDuration: "4:36" },
      { trackTitle: "Could Never Be Heaven", trackDuration: "3:16" },
      { trackTitle: "Same Logic/Teeth", trackDuration: "5:34" },
      { trackTitle: "137", trackDuration: "5:02" },
      { trackTitle: "Out of Mana", trackDuration: "5:15" },
      { trackTitle: "In the Water", trackDuration: "6:52" },
      { trackTitle: "Desert", trackDuration: "3:37" },
      { trackTitle: "No Control", trackDuration: "3:55" },
      { trackTitle: "451", trackDuration: "4:53" },
      { trackTitle: "Batter Up", trackDuration: "8:28" }
    ]
  }
};

const Albums = sequelize.define("Albums", {
  albumName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  releaseDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Songs = sequelize.define("Songs", {
  albumName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trackTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trackDuration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

try {
  await sequelize.authenticate();
  await sequelize.sync();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const router = Router();

async function populateDatabase() {
  for (const [albumName, albumData] of Object.entries(albums)) {
    await Albums.findOrCreate({
      where: { albumName },
      defaults: { releaseDate: albumData.releaseDate },
    });

    for (const song of albumData.songs) {
      await Songs.findOrCreate({
        where: { albumName, trackTitle: song.trackTitle },
        defaults: { trackDuration: song.trackDuration },
      });
    }
  }
}

await populateDatabase();

router.get("/", (req, res) => {
  res.send("Brand New");
});

router.get("/band", (req, res) => {
  res.send("Brand New is an American rock band from Long Island, New York.");
});

router.get("/formed", (req, res) => {
  res.send("Brand New formed in 2000.");
});

router.get("/genre", (req, res) => {
  res.send("Brand New is commonly associated with alternative rock, emo, and post-hardcore.");
});

router.get("/members", (req, res) => {
  res.send("The band's main members were Jesse Lacey, Vincent Accardi, Garrett Tierney, and Brian Lane.");
});

router.get("/refresh", (req, res) => {
  res.send("I didn't restart the server.");
});

router.get("/hotsauce", (req, res) => {
  const typeOfHotSauce = req.query.type;

  if (typeOfHotSauce) {
    res.send(`You must like ${typeOfHotSauce} hot sauce`);
  } else {
    res.send("Query String Please");
  }
});

router.get("/albums", async (req, res) => {
  const allAlbums = await Albums.findAll();
  const allSongs = await Songs.findAll();

  const formatted = {};
  for (const a of allAlbums) {
    formatted[a.albumName] = {
      releaseDate: a.releaseDate,
      songs: allSongs
        .filter((s) => s.albumName === a.albumName)
        .map((s) => ({ trackTitle: s.trackTitle, trackDuration: s.trackDuration })),
    };
  }

  res.json(formatted);
});

router.get("/albums/:albumName", async (req, res) => {
  const albumName = req.params.albumName;
  const album = await Albums.findOne({ where: { albumName } });

  if (!album) {
    return res.status(404).json({ error: "Album not found" });
  }

  const songs = await Songs.findAll({
    where: { albumName },
    attributes: ["trackTitle", "trackDuration"],
  });

  res.json({
    albumName: album.albumName,
    details: {
      releaseDate: album.releaseDate,
      songs: songs,
    },
  });
});

router.post("/albums", async (req, res) => {
  const albumName = req.body.albumName;
  const releaseDate = req.body.releaseDate;

  if (!albumName || !releaseDate) {
    return res.status(400).json({ error: "Missing album name or release date" });
  }

  const existing = await Albums.findOne({ where: { albumName } });
  if (existing) {
    return res.status(409).json({ error: "Album already exists" });
  }

  await Albums.create({ albumName, releaseDate });

  res.status(201).json({
    message: "Album added successfully",
    album: {
      releaseDate: releaseDate,
      songs: [],
    },
  });
});

router.put("/albums/:albumName", async (req, res) => {
  const albumName = req.params.albumName;
  const releaseDate = req.body.releaseDate;

  const album = await Albums.findOne({ where: { albumName } });
  if (!album) {
    return res.status(404).json({ error: "Album not found" });
  }

  if (!releaseDate) {
    return res.status(400).json({ error: "Missing new release date" });
  }

  await album.update({ releaseDate });

  res.json({
    message: "Album updated successfully",
    album: {
      releaseDate: album.releaseDate,
    },
  });
});

router.put("/albums/:albumName/rename", async (req, res) => {
  const oldAlbumName = req.params.albumName;
  const newAlbumName = req.body.newAlbumName;

  const album = await Albums.findOne({ where: { albumName: oldAlbumName } });
  if (!album) {
    return res.status(404).json({ error: "Album not found" });
  }

  if (!newAlbumName) {
    return res.status(400).json({ error: "Missing new album name" });
  }

  const conflict = await Albums.findOne({ where: { albumName: newAlbumName } });
  if (conflict) {
    return res.status(409).json({ error: "An album with that name already exists" });
  }

  await album.update({ albumName: newAlbumName });
  await Songs.update({ albumName: newAlbumName }, { where: { albumName: oldAlbumName } });

  res.json({
    message: "Album renamed successfully",
    album: {
      releaseDate: album.releaseDate,
    },
  });
});

router.delete("/albums/:albumName", async (req, res) => {
  const albumName = req.params.albumName;

  const deleted = await Albums.destroy({ where: { albumName } });
  if (!deleted) {
    return res.status(404).json({ error: "Album not found" });
  }

  await Songs.destroy({ where: { albumName } });
  res.json({ message: "Album deleted successfully" });
});

router.post("/albums/:albumName/songs", async (req, res) => {
  const albumName = req.params.albumName;
  const songName = req.body.songName;
  const length = req.body.length;

  const album = await Albums.findOne({ where: { albumName } });
  if (!album) {
    return res.status(404).json({ error: "Album not found" });
  }

  if (!songName || !length) {
    return res.status(400).json({ error: "Missing song name or length" });
  }

  await Songs.create({
    albumName: albumName,
    trackTitle: songName,
    trackDuration: length,
  });

  const updatedSongs = await Songs.findAll({
    where: { albumName },
    attributes: ["trackTitle", "trackDuration"],
  });

  res.status(201).json({
    message: "Song added successfully",
    songs: updatedSongs,
  });
});

router.put("/albums/:albumName/songs/:trackTitle", async (req, res) => {
  const albumName = req.params.albumName;
  const currentTrackTitle = req.params.trackTitle;
  const newTrackTitle = req.body.newTrackTitle;
  const newTrackDuration = req.body.newTrackDuration;

  const album = await Albums.findOne({ where: { albumName } });
  if (!album) {
    return res.status(404).json({ error: "Album not found" });
  }

  const song = await Songs.findOne({
    where: { albumName, trackTitle: currentTrackTitle },
  });

  if (!song) {
    return res.status(404).json({ error: "Song not found" });
  }

  if (newTrackTitle) {
    song.trackTitle = newTrackTitle;
  }
  if (newTrackDuration) {
    song.trackDuration = newTrackDuration;
  }
  await song.save();

  const updatedSongs = await Songs.findAll({
    where: { albumName },
    attributes: ["trackTitle", "trackDuration"],
  });

  res.json({
    message: "Song updated successfully",
    songs: updatedSongs,
  });
});

export default router;