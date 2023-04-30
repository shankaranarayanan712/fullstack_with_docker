/** @format */

import express from 'express';
import { validateQueryParams } from '../validation/getPlayer.request.validation';
import { deletePlayer } from '../controllers/player.controller';
const router = express.Router();
const { checkSchema } = require('express-validator');
const {
	userDataValidateSchemaBased,
} = require('../validation/createPlayer.request.validation');
const {
	getPlayers,
	createPlayer,
} = require('../controllers/player.controller');

router.get('/', validateQueryParams, getPlayers);
router.post('/', checkSchema(userDataValidateSchemaBased), createPlayer);
router.delete('/:id', deletePlayer);
module.exports = router;
