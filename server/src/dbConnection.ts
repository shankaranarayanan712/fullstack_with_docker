// dbUtils.ts
import mysql from 'mysql';



const dbConnection = mysql.createConnection({
	host: process.env.MYSQL_HOST || 'localhost',
	user: 'root',
	database: process.env.MYSQL_DATABASE || 'mydb',
	password: process.env.MYSQL_ROOT_PASSWORD || 'password',
});


export default dbConnection;
