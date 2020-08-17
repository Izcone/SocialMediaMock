import bcrypt from 'bcrypt';
import { IResponseHandler } from './../../handlers/responseHandler';
import { userExists, addUser } from '../../repositories/MongoUserRepository';
import { CreateUserDTO, ICreateUserDTO } from './CreateUserDTO';

const createUser = async (
	newUserDTO: ICreateUserDTO
): Promise<IResponseHandler> => {
	const { username, email, password } = newUserDTO;

	const alreadyExists = await userExists(email);

	if (alreadyExists) {
		return {
			error: true,
			message: `The email ${email} is already in use`,
		};
	}

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	const hashedUser = new CreateUserDTO(username, email, hash);

	const newUser = await addUser(hashedUser);

	if (newUser) {
		return {
			error: false,
			message: '',
			object: {
				username: newUser.username,
				email: newUser.email,
			},
		};
	}

	return {
		error: true,
		message: 'Failed to create new user',
	};
};

export default createUser;
