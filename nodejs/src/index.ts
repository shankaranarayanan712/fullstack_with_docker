/** @format */

const express = require('express');
const app = express();

const cors = require('cors');
const port = 3008;
const playerRoutes = require('./routers/players.router');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/playerRoutes', playerRoutes);

app.listen(port, () => console.log(`Node API up at http://localhost:${port}`));
