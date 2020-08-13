import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const UserSchema = mongoose.Schema({
	_id: {
		type: String,
		default: uuidv4(),
	},
	accountCreated: {
		type: Date,
		default: Date.now,
	},
	username: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024,
	},
	email: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	},
});

const User = mongoose.model('User', UserSchema, 'Users');

export { User };
