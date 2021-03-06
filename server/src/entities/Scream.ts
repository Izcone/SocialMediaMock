import { IUser } from './User';
import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IScream extends Document {
	userId: IUser['_id'];
	body: String;
}

const ScreamSchema: Schema = new Schema({
	_id: {
		type: String,
		unique: true,
		default: uuidv4,
	},
	_createdAt: {
		type: Date,
		default: Date.now,
	},
	userId: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
		min: 1,
		max: 1024,
	},
});

const Scream = mongoose.model<IScream>('Scream', ScreamSchema, 'Screams');

export { Scream };
