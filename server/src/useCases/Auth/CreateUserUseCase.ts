import bcrypt from 'bcrypt';
import { IResponseHandler } from './../../handlers/responseHandler';
import { userExists, addUser } from '../../repositories/MongoUserRepository';
import { UserDTO, IUserDTO } from './UserDTO';

const createUser = async (
	newUserDTO: IUserDTO
): Promise<IResponseHandler<IUserDTO>> => {
	const { name, email, password } = newUserDTO;

	const alreadyExists = await userExists(email);

	if (alreadyExists) {
		return {
			error: true,
			message: `The email ${email} is already in use`,
		};
	}

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	const hashedUser = new UserDTO(name, email, hash);

	const newUser = await addUser(hashedUser);

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

export default createUser;
