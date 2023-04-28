/** @format */

const userDataValidateSchemaBased = {
	player: {
		exists: {
			errorMessage: ' player name is required',
			options: { checkFalsy: true },
		},
		isString: { errorMessage: 'name should be string' },
	},
	height: {
		exists: {
			errorMessage: 'height is required',
			options: { checkFalsy: true },
		},
	},
	weight: {
		exists: {
			errorMessage: 'weight is required',
			options: { checkFalsy: true },
		},
	},
	collage: {
		exists: {
			errorMessage: 'collage is required',
			options: { checkFalsy: true },
		},
		isString: { errorMessage: 'born should be string' },
	},
	born: {
		exists: {
			errorMessage: 'born is required',
			options: { checkFalsy: true },
		},
		isString: { errorMessage: 'born should be string' },
	},
};

module.exports = {
	userDataValidateSchemaBased,
};
