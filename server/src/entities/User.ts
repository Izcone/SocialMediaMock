import { BCRYPT_WORK_FACTOR } from './../config/auth';
import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';

export interface IUser extends Document {
	name: string;
	password: string;
	email: string;
}

const UserSchema: Schema = new Schema(
	{
		_id: {
			type: String,
			default: uuidv4(),
		},
		accountCreated: {
			type: Date,
			default: Date.now,
		},
		name: {
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
	},
	{
		timestamps: true,
	}
);

UserSchema.pre<IUser>('save', async function () {
	if (this.isModified('password')) {
		this.password = await hash(this.password, BCRYPT_WORK_FACTOR);
	}
});

const User = mongoose.model<IUser>('User', UserSchema, 'Users');

export { User };
