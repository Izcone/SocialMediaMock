import bcrypt from 'bcrypt';
import { User } from '../../entities/User';
import { userExists, addUser } from '../../repositories/MongoUserRepository';
import { CreateUserDTO } from './CreateUserDTO';

const createUser = async (newUserDTO) => {
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
		};
	}

	return {
		error: true,
		message: 'Failed to create new user',
	};
};

export default createUser;
