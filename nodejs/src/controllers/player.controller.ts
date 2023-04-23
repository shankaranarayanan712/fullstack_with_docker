/** @format */
import { Request, Response } from 'express';
const dbUtil = require('util');
const connection = require('../dbConnection');
import { PlayerResponse } from '../interfaces/player.response';
const { validationResult } = require('express-validator');

const playerQuery = dbUtil.promisify(connection.query).bind(connection);

const getPlayers = async (req: Request, res: Response) => {
	try {
		let numRows;
		const requestNpp = req.query.npp as string;
		const requestPage = req.query.page as string;
		const numPerPage = parseInt(requestNpp, 10) || 10;
		const page = parseInt(requestPage, 10) || 0;
		let numPages: number;
		const skip = page * numPerPage;
		// Here we compute the LIMIT parameter for MySQL query
		const limit = skip + ',' + numPerPage;
		const totalPlayers = await playerQuery(
			'SELECT count(*) as numRows FROM players'
		);

		numRows = totalPlayers[0].numRows;
		numPages = Math.ceil(numRows / numPerPage);

		const playersInRange = await playerQuery(
			'SELECT * FROM players ORDER BY ID ASC LIMIT ' + limit
		);

		const responsePayload: Partial<PlayerResponse> = {
			data: playersInRange,
		};
		if (page < numPages) {
			responsePayload.pagination = {
				current: page,
				perPage: numPerPage,
				previous: page > 0 ? page - 1 : undefined,
				next: page < numPages - 1 ? page + 1 : undefined,
			};
		} else {
			responsePayload.pagination.err =
				'queried page ' + page + ' is >= to maximum page number ' + numPages;
		}
		res.json(responsePayload);
	} catch (err) {
		console.log('err', err);
		res.status(400);
	}
};

const createaPlayer = async (req: Request, res: Response) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}
		const { player, height, weight, collage, born, position } = req.body;
		const createPlayerSql = `INSERT INTO players (player,height,weight,collage,born,position) VALUES(?)`;
		const values = [[player, height, weight, collage, born, position]];
		const savePlayer = await playerQuery(createPlayerSql, values);
		res.send(201);
	} catch (err) {
		console.log('err', err);
		throw err;
	}
};

module.exports = {
	getPlayers,
	createaPlayer,
};
