import { ICreateUserDTO } from './../useCases/User/CreateUserDTO';
import { User } from '../entities/User';

export const userExists = async (email: string): Promise<boolean> => {
	const user = await User.findOne({ email });
	return user ? true : false;
};

export const addUser = async (
	newUserDTO: ICreateUserDTO
): Promise<ICreateUserDTO> => {
	try {
		const user = await User.create(newUserDTO);
		return user;
	} catch (error) {
		return error;
	}
};
