import { connect as conn, Promise, connection } from 'mongoose';
const DB_URI = process.env.DB_URI;

export default async function connect() {
	const dbOptions = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		autoIndex: false,
		useFindAndModify: false,
		connectTimeoutMS: 10000,
		family: 4,
	};

	await conn(DB_URI, dbOptions);
	Promise = global.Promise;

	return connection;
}
