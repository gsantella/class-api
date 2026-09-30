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
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  res.send(randomColor)
});

router.get('/refresh', (req, res) => {
  res.send("Hot reload check! Zoo weeee mama!")
});

router.post('/post', (req, res) => {
  res.send('This will be a POST');
});

router.put('/put', (req, res) => {
  res.send('This will be a PUT.');
});

router.delete('/delete', (req, res) => {
  res.send('This will be a DELETE.');
});

export default router;