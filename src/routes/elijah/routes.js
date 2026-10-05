import { Router } from "express";
import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "brandnew.sqlite",
  logging: false,
});

const router = Router();

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

const Album = sequelize.define("Album", {
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

const Song = sequelize.define("Song", {
  trackTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trackDuration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Album.hasMany(Song, { foreignKey: "albumId", as: "songs", onDelete: "CASCADE" });
Song.belongsTo(Album, { foreignKey: "albumId" });

try {
  await sequelize.authenticate();
  await sequelize.sync();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

async function populateDatabase() {
  for (const [albumName, albumData] of Object.entries(albums)) {
    const [album] = await Album.findOrCreate({
      where: { albumName },
      defaults: { releaseDate: albumData.releaseDate },
    });

    for (const song of albumData.songs) {
      await Song.findOrCreate({
        where: { albumId: album.id, trackTitle: song.trackTitle },
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
  const allAlbums = await Album.findAll({
    include: [{ model: Song, as: "songs", attributes: ["trackTitle", "trackDuration"] }],
  });
  res.json(allAlbums);
});

router.get("/albums/:albumName", async (req, res) => {
  const album = await Album.findOne({
    where: { albumName: req.params.albumName },
    include: [{ model: Song, as: "songs", attributes: ["trackTitle", "trackDuration"] }],
  });

  if (!album) {
    return res.status(404).json({ error: "Album not found" });
  }

  res.json({
    albumName: album.albumName,
    details: {
      releaseDate: album.releaseDate,
      songs: album.songs,
    },
  });
});

router.post("/albums", async (req, res) => {
  const { albumName, releaseDate } = req.body;

  if (!albumName || !releaseDate) {
    return res.status(400).json({ error: "Missing album name or release date" });
  }

  try {
    const newAlbum = await Album.create({ albumName, releaseDate });
    res.json({
      message: "Album added successfully",
      album: { ...newAlbum.toJSON(), songs: [] },
    });
  } catch (err) {
    res.json({ error: "Database error" });
  }
});

router.put("/albums/:albumName", async (req, res) => {
  const { releaseDate } = req.body;

  if (!releaseDate) {
    return res.status(400).json({ error: "Missing new release date" });
  }

  const album = await Album.findOne({
    where: { albumName: req.params.albumName },
    include: [{ model: Song, as: "songs", attributes: ["trackTitle", "trackDuration"] }],
  });

  if (!album) {
    return res.status(404).json({ error: "Album not found" });
  }

  await album.update({ releaseDate });
  res.json({ message: "Album updated successfully", album });
});

router.put("/albums/:albumName/rename", async (req, res) => {
  const { newAlbumName } = req.body;

  if (!newAlbumName) {
    return res.status(400).json({ error: "Missing new album name" });
  }

  const album = await Album.findOne({ where: { albumName: req.params.albumName } });
  if (!album) {
    return res.status(404).json({ error: "Album not found" });
  }

  try {
    await album.update({ albumName: newAlbumName });
    res.json({ message: "Album renamed successfully", album });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

router.delete("/albums/:albumName", async (req, res) => {
  const deleted = await Album.destroy({ where: { albumName: req.params.albumName } });
  if (!deleted) {
    return res.status(404).json({ error: "Album not found" });
  }
  res.json({ message: "Album deleted successfully" });
});

router.post("/albums/:albumName/songs", async (req, res) => {
  const { songName, length } = req.body;

  if (!songName || !length) {
    return res.status(400).json({ error: "Missing song name or length" });
  }

  const album = await Album.findOne({ where: { albumName: req.params.albumName } });
  if (!album) {
    return res.status(404).json({ error: "Album not found" });
  }

  await Song.create({
    albumId: album.id,
    trackTitle: songName,
    trackDuration: length,
  });

  const updatedSongs = await Song.findAll({
    where: { albumId: album.id },
    attributes: ["trackTitle", "trackDuration"],
  });

  res.json({
    message: "Song added successfully",
    songs: updatedSongs,
  });
});

router.put("/albums/:albumName/songs/:trackTitle", async (req, res) => {
  const { newTrackTitle, newTrackDuration } = req.body;

  const album = await Album.findOne({ where: { albumName: req.params.albumName } });
  if (!album) {
    return res.status(404).json({ error: "Album not found" });
  }

  const song = await Song.findOne({
    where: { albumId: album.id, trackTitle: req.params.trackTitle },
  });

  if (!song) {
    return res.status(404).json({ error: "Song not found" });
  }

  const updates = {};
  if (newTrackTitle) updates.trackTitle = newTrackTitle;
  if (newTrackDuration) updates.trackDuration = newTrackDuration;

  await song.update(updates);

  const updatedSongs = await Song.findAll({
    where: { albumId: album.id },
    attributes: ["trackTitle", "trackDuration"],
  });

  res.json({
    message: "Song updated successfully",
    songs: updatedSongs,
  });
});

export default router;