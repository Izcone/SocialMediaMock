import { IN_PROD } from './app';
import { SessionOptions } from 'express-session';

const { SESSION_SECRET, SESSION_NAME, SESSION_IDLE_TIMEOUT } = process.env;

export const SESSION_OPTIONS: SessionOptions = {
	secret: SESSION_SECRET,
	name: SESSION_NAME,
	saveUninitialized: false,
	resave: false,
	rolling: true,
	cookie: {
		maxAge: +SESSION_IDLE_TIMEOUT,
		secure: IN_PROD,
		sameSite: true,
	},
};
