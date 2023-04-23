/** @format */

import express from 'express';
const router = express.Router();
const { checkSchema } = require('express-validator');
const {
	userDataValidateSchemaBased,
} = require('../validation/createPlayer.request.validation');
const {
	getPlayers,
	createaPlayer,
} = require('../controllers/player.controller');

router.get('/', getPlayers);
router.post('/', checkSchema(userDataValidateSchemaBased), createaPlayer);

module.exports = router;
