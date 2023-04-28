/** @format */

import { createTables, insertSeedData } from './sqlData/initialise';

const express = require('express');
const cors = require('cors');

const playerRoutes = require('./routers/players.router');

const app = express();
const port = 3008;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/players', playerRoutes);

const initialise = async () => {
	await createTables();
	await insertSeedData();
};
initialise();

app.listen(port, () =>
	console.log(`Server started at http://localhost:${port}`)
);
