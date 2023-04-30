/** @format */

import db from '../dbConnection';
import util from 'util';

export const playerQuery = util.promisify(db.query).bind(db);
