/** @format */

import { Request, Response } from 'express';
import { playerQuery } from '../utils/utils';
import { getPlayers, createPlayer } from './player.controller';
import { validationResult } from 'express-validator';

jest.mock('../utils/utils', () => {
	const mockPlayerQuery = jest.fn();
	return {
		playerQuery: mockPlayerQuery,
	};
});

// describe('getPlayers', () => {
// 	let mockReq: Request;
// 	let mockRes: Response;

// 	beforeEach(() => {
// 		mockReq = {
// 			query: {},
// 		} as Request;
// 		mockRes = {
// 			json: jest.fn(),
// 			sendStatus: jest.fn(),
// 		} as unknown as Response;
// 	});

// 	it('should return expected payload when called with valid input', async () => {
// 		// Set up mock request with valid query parameters
// 		mockReq.query.npp = '5';
// 		mockReq.query.page = '1';

// 		// Call the function and wait for it to finish
// 		await getPlayers(mockReq, mockRes);

// 		// Expect the response to be as expected
// 		expect(mockRes.json).toHaveBeenCalledWith({
// 			data: expect.any(Array),
// 			pagination: {
// 				current: 1,
// 				perPage: 5,
// 				previous: 0,
// 				next: 2,
// 				err: undefined,
// 			},
// 		});
// 	});

// 	it.only('should validate query parameters', async () => {
// 		// Set up mock request with invalid query parameters
// 		mockReq.query.npp = '5';
// 		mockReq.query.page = '5';

// 		// Call the function and wait for it to finish
// 		await getPlayers(mockReq, mockRes);

// 		// Expect the response to be an error
// 		expect(mockRes.sendStatus).not.toHaveBeenCalledWith(400);
// 	});
// });

describe('createPlayer', () => {
	let req: Request;
	let res: Response;
	let next: jest.Mock;

	beforeEach(() => {
		req = {
			body: {
				player: 'John Doe',
				height: '6ft 1in',
				weight: '185 lbs',
				collage: 'Example University',
				born: 'January 1, 1990',
				position: 'Forward',
			},
		} as Request;

		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
			sendStatus: jest.fn(),
		} as any;

		next = jest.fn() as any;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return 201 status code for valid input', async () => {
		(playerQuery as jest.Mock).mockResolvedValueOnce([{ numRows: 1 }]);

		await createPlayer(req, res);

		expect(playerQuery).toHaveBeenCalledWith(
			'INSERT INTO players (player,height,weight,collage,born,position) VALUES(?)',
			[
				[
					req.body.player,
					req.body.height,
					req.body.weight,
					req.body.collage,
					req.body.born,
					req.body.position,
				],
			]
		);
		expect(res.sendStatus).toHaveBeenCalledWith(201);
		expect(next).not.toHaveBeenCalled();
	});

});
