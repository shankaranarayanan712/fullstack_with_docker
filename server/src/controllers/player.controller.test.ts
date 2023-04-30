/** @format */

import { Request, Response } from 'express';

import { getPlayers, createPlayer } from './player.controller';

describe('getPlayers', () => {
	let mockReq: Partial<Request>;
	let mockRes: Partial<Response>;

	beforeEach(() => {
		mockReq = {
			query: {
				count: '10',
				page: '0',
			},
		};
		mockRes = {
			json: jest.fn(),
		};
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should return expected payload when called with valid input', async () => {
		await getPlayers(mockReq as Request, mockRes as Response);

		expect(mockRes.json).toHaveBeenCalledWith({
			data: expect.any(Array),
			pagination: {
				current: 0,
				perPage: 10,
				previous: undefined,
				next: 1,
				err: undefined,
			},
		});
	});

	it('should return expected payload when called with page number greater than numPages', async () => {
		mockReq.query.page = '1000';

		await getPlayers(mockReq as Request, mockRes as Response);

		expect(mockRes.json).toHaveBeenCalledWith({
			data: [],
			pagination: {
				current: 1000,
				perPage: 10,
				previous: undefined,
				next: undefined,
				err: 'queried page 1000 is >= to maximum page number 393',
			},
		});
	});
});

describe('createPlayer', () => {
	jest.mock('../utils/utils', () => ({
		playerQuery: jest.fn().mockResolvedValue([
			{
				id: 1,
				player: 'Test Player ',
				height: '180',
				weight: '220',
				collage: 'Test College',
				born: '1990',
				position: 'SG',
			},
		]),
	}));
	let mockReq: Partial<Request>;
	let mockRes: Partial<Response>;

	beforeEach(() => {
		mockReq = {};
		mockRes = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
			sendStatus: jest.fn(),
		};
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should create player if request is valid', async () => {
		mockReq.body = {
			player: 'Test Player',
			height: '180',
			weight: '220',
			collage: 'Test College',
			born: '1990',
			position: 'SG',
		};

		await createPlayer(mockReq as Request, mockRes as Response);

		expect(mockRes.json).not.toHaveBeenCalled();
		expect(mockRes.sendStatus).toHaveBeenCalledWith(201);
	});
});