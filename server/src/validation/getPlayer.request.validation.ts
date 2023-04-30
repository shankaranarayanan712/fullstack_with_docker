/** @format */

import { Request, Response, NextFunction } from 'express';
import { query, validationResult } from 'express-validator';
export const validateQueryParams = [
	query('npp').exists().isNumeric(),
	query('page').exists().isNumeric(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];
