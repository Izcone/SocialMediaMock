import { Router } from 'express';
import { CreateUserDTO } from './CreateUserDTO';
import createUser from './CreateUserUseCase';

const router = Router();

router.post('/signup', async (req, res) => {
	const { username, email, password } = req.body;
	const newUserDTO = new CreateUserDTO(username, email, password);

	const { error, message } = await createUser(newUserDTO);

	!error ? res.status(201).send() : res.status(400).send(message);
});

export { router as userController };
