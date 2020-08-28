import { IResponseHandler } from '../../handlers/responseHandler';
import { userExists, addUser } from '../../repositories/MongoUserRepository';
import { IUserDTO, UserDTO } from './UserDTO';

const registerUser = async (
	newUserDTO: IUserDTO
): Promise<IResponseHandler<IUserDTO>> => {
	const { email } = newUserDTO;

	const alreadyExists = await userExists(email);

	if (alreadyExists) {
		return {
			error: true,
			message: `The email ${email} is already in use`,
		};
	}

	const newUser = await addUser(newUserDTO);

	if (newUser) {
		return {
			error: false,
			message: '',
			object: {
				id: newUser.id,
				name: newUser.name,
				email: newUser.email,
				password: '',
			},
		};
	}

	return {
		error: true,
		message: 'Failed to create new user',
	};
};

export default registerUser;
