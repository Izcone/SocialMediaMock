import { IUserDTO } from '../useCases/Auth/UserDTO';
import { User } from '../entities/User';

export const userExists = async (email: string): Promise<boolean> => {
	const user = await User.findOne({ email });
	return user ? true : false;
};

export const getUserInfo = async (userId: string): Promise<IUserDTO> => {
	try {
		const user = await User.findOne({ userId });
		return user;
	} catch (error) {
		return null;
	}
};

export const addUser = async (newUserDTO: IUserDTO): Promise<IUserDTO> => {
	try {
		const user = await User.create(newUserDTO);
		return user;
	} catch (error) {
		return error;
	}
};
