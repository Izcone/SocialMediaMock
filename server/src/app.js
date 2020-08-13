import express from 'express';
import { router } from './router';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose
	.connect(process.env.DB_CONNECT, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to mongo');
	})
	.catch((e) => {
		console.log('Error connecting to mongo', e);
	});

const app = express();

app.use(express.json());
app.use(router);

export { app };
