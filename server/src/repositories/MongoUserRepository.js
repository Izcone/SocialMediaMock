import mongoose from 'mongoose';
import { User } from '../entities/User';

export const userExists = async (email) => {
	const user = await User.findOne({ email });
	return user ? true : false;
};

export const addUser = async (newUserDTO) => {
	const user = await User.create(newUserDTO);
	return user;
};
