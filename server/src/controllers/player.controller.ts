/** @format */

import { Request, Response } from 'express';

import { PlayerResponse } from '../interfaces/player.response';
import { validationResult } from 'express-validator';
import { playerQuery } from '../utils/utils';

export const getPlayers = async (req: Request, res: Response) => {
	try {
		const recordCount = req.query?.count as string;
		const requestPage = req.query?.page as string;
		const numPerPage = parseInt(recordCount, 10) || 10;
		const page = parseInt(requestPage, 10) || 0;
		const skip = page * numPerPage;
		const limit = `${skip},${numPerPage}`;
		const totalPlayers = await playerQuery(
			'SELECT count(*) as numRows FROM players'
		);
		const numRows = totalPlayers && totalPlayers[0].numRows;
		const numPages =
			Math.ceil(numRows / numPerPage) > 0 ? Math.ceil(numRows / numPerPage) : 0;
		const playersInRange = await playerQuery(
			`SELECT * FROM players ORDER BY ID ASC LIMIT ${limit}`
		);

		const responsePayload: Partial<PlayerResponse> = {
			data: playersInRange,
			pagination: {
				current: page,
				perPage: numPerPage,
				previous: undefined,
				next: undefined,
				err: undefined,
			},
		};
		if (page <= numPages) {
			responsePayload.pagination = {
				current: page,
				perPage: numPerPage,
				previous: page > 0 ? page - 1 : undefined,
				next: page < numPages - 1 ? page + 1 : undefined,
				err: undefined,
			};
		} else {
			responsePayload.pagination = {
				...responsePayload.pagination,
				err: `queried page ${page} is >= to maximum page number ${numPages}`,
			};
		}
		res.json(responsePayload);
	} catch (err) {
		res.sendStatus(400);
	}
};

export const createPlayer = async (req: Request, res: Response) => {
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
		await playerQuery(createPlayerSql, values);
		res.sendStatus(201);
	} catch (err) {
		throw err;
	}
};

export const deletePlayer = async (req: Request, res: Response) => {
	try {
		const playerId = req.params.id;
		if (!playerId) throw Error('Player id is missing');
		const deletePlayerSql = `DELETE FROM players WHERE id = ?`;
		const values = [playerId];
		await playerQuery(deletePlayerSql, values);
		res.sendStatus(204);
	} catch (err) {
		throw err;
	}
};