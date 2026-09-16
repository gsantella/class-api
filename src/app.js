import express from 'express';

import austinRoutes from './routes/austin/routes.js';
import cameronRoutes from './routes/cameron/routes.js';
import deandreRoutes from './routes/deandre/routes.js';
import destinyRoutes from './routes/destiny/routes.js';
import elijahRoutes from './routes/elijah/routes.js';
import guidoRoutes from './routes/guido/routes.js';

const app = express();

app.use(express.json());

app.use('/api/austin', austinRoutes);
app.use('/api/cameron', cameronRoutes);
app.use('/api/deandre', deandreRoutes);
app.use('/api/destiny', destinyRoutes);
app.use('/api/elijah', elijahRoutes);
app.use('/api/guido', guidoRoutes);

app.use("/austin", express.static("./src/static/austin"));
app.use("/cameron", express.static("./src/static/cameron"));
app.use("/deandre", express.static("./src/static/deandre"));
app.use("/destiny", express.static("./src/static/destiny"));
app.use("/elijah", express.static("./src/static/elijah"));
app.use("/guido", express.static("./src/static/guido"));
 
export default app;