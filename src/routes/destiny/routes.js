import { Router } from 'express';

const router = Router();
const members = [
  { id: 1, name: 'Billy Bob' },
  { id: 2, name: 'Looney Bird' },
  { id: 3, name: 'Dook LaRue' },
  { id: 4, name: 'Fatz Geronimo' },
  { id: 5, name: 'Beach Bear' },
  { id: 6, name: 'Mitzi Motzarella' },
  { id: 7, name: 'Earl Schmerle' },
  { id: 8, name: 'Rolfe DeWolfe' }
];

const songs = [
  { id: 1, songName: 'Heartaches', leadId: 3, lead: 'Dook LaRue' },
  { id: 2, songName: 'Dragstrip', leadId: 6, lead: 'Mitzi Motzarella' },
  { id: 3, songName: 'My Gal is Red Hot', leadId: 4, lead: 'Fatz Geronimo' },
  { id: 4, songName: 'Pretty Woman', leadId: 3, lead: 'Dook Larue' }
];

const colors = [
  "Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"
];
let magicWords = '';

router.get('/', (req, res) => {
  res.send('Welcome to Showbiz Pizza!');
});

router.get('/band', (req, res) => {
  res.json(members);
});

router.get('/songs', (req, res) => {
  res.json(songs);
});

router.get('/color', (req, res) => {
  let randomIndex = Math.floor(Math.random() * colors.length);
  let randomColor = colors[randomIndex];
  res.send(randomColor)
});

router.get('/refresh', (req, res) => {
  res.send("Hot reload check! Zoo weeee mama!")
});

router.get('/magicwords', (req, res) => {
  res.json({ magicWords });
});

router.patch('/magicwords', (req, res) => {
  if (typeof req.body?.magicWords !== 'string') {
    return res.status(400).json({ error: 'magicWords must be a string.' });
  }

  magicWords = req.body.magicWords;
  res.json({ magicWords });
});

router.delete('/magicwords', (req, res) => {
  magicWords = '';
  res.json({ magicWords });
});

export default router;