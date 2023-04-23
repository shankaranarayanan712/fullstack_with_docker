/** @format */

const mysql = require('mysql');
const csvtojson = require('csvtojson');
const playerData = require('./sqlData/players');
const seasonStatsData = require('./sqlData/seasonstats');
const util = require('util');

const dbConnection = mysql.createConnection({
	host: process.env.MYSQL_HOST || 'localhost',
	user: 'root',
	database: process.env.MYSQL_DATABASE || 'mydb',
	password: process.env.MYSQL_ROOT_PASSWORD || 'password',
});

const query = util.promisify(dbConnection.query).bind(dbConnection);

const createTables = async () => {
	try {
		//const data = await seedData();
		const dropPlayerTable = 'DROP TABLE IF EXISTS players;';
		const createPlayersTable = `CREATE TABLE players 
		(
			id INT PRIMARY KEY AUTO_INCREMENT, 
			player	VARCHAR(512),
			height	INTEGER,
			weight	INTEGER,
			collage	VARCHAR(512),
			born	VARCHAR(512),
			birth_city	VARCHAR(100),
			birth_state	VARCHAR(512),
			year_start VARCHAR(512),
			year_end VARCHAR(512),
			position VARCHAR(512)

		);`;
		const dropSeasonStatsTable = 'DROP TABLE IF EXISTS season_stats;';
		const createSeasonStatsTable = `CREATE TABLE season_stats
		( 
			id INT PRIMARY KEY AUTO_INCREMENT, 
			season VARCHAR(15), 
			player VARCHAR(100) ,
			position VARCHAR(30),
			age INTEGER, 
			games VARCHAR(30), 
			pts INTEGER 
		);`;

		await query(dropPlayerTable);
		await query(dropSeasonStatsTable);
		const qP = await query(createPlayersTable);
		const qS = await query(createSeasonStatsTable);
	} catch (err) {
		console.log('err', err);
	}
};
const insertSeedData = async () => {
	try {
		const playersSql =
			'INSERT INTO players (player, height, weight, collage,born,birth_city,birth_state,year_start,year_end,position) VALUES ?';
		const queryArr = [
			playerData?.players.map((field: any) => [
				field.player,
				field.height ? field.height : 0,
				field.weight ? field.weight : 0,
				field.collage,
				field.born ? field.born : 0,
				field.birth_city,
				field.birth_state,
				field.year_start,
				field.year_end,
				field.position,
			]),
		];
		const seasonStatsInsert = `INSERT INTO season_stats (season, player, position, age,games,pts) VALUES ?`;
		const seasonStatsQuery = [
			seasonStatsData?.seasonStats.map((field: any) => [
				field.year,
				field.player,
				field.pos,
				field.age ? field.age : 0,
				field.games,
				field.pts ? field.pts : 0,
			]),
		];

		Promise.all([
			query(playersSql, queryArr),
			query(seasonStatsInsert, seasonStatsQuery),
		]);
	} catch (err) {
		console.log('err', err);
		throw err;
	}
};

dbConnection.connect(async (err: Error): Promise<void> => {
	try {
		if (err) throw err;
		console.log('Connected to database');
		await createTables();
		await insertSeedData();
		console.log('Seed Data Inserted SUccessfully');
	} catch (err) {
		console.log('err', err);
	}
});

module.exports = dbConnection;
