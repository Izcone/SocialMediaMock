import { ConnectionOptions } from 'mongoose';

export const MONGO_URI = process.env.DB_CONNECT;

export const MONGO_OPTIONS: ConnectionOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
