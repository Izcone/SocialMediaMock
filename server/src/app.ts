import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import { MONGO_URI, MONGO_OPTIONS, SESSION_OPTIONS } from './config';
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

mongoose
	.connect(MONGO_URI, MONGO_OPTIONS)
	.then(() => {
		console.log('Connected to mongo');
	})
	.catch((e) => {
		console.log('Error connecting to mongo', e);
	});

const app = express();

app.use(
	session({
		...SESSION_OPTIONS,
		store: new MongoStore({
			url: process.env.DB_CONNECT,
		}),
	})
);

app.use(express.json());
app.use(router);

app.use((req: Request, res: Response, next: NextFunction) => {
	res.status(404).send({ message: 'Not Found' });
});

export { app };
