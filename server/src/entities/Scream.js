import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ScreamSchema = mongoose.Schema({
	_id: {
		type: String,
		default: uuidv4(),
	},
	_createdAt: {
		type: Date,
		default: Date.now,
	},
	user: {
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

const Scream = mongoose.model('Scream', ScreamSchema);

export { Scream };
