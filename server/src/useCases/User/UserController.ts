import { Router, Request, Response } from 'express';
import { CreateUserDTO } from './CreateUserDTO';
import createUser from './CreateUserUseCase';

const router = Router();

router.post(
	'/signup',
	async (req: Request, res: Response): Promise<Response> => {
		const { username, email, password } = req.body;
		const newUserDTO = new CreateUserDTO(username, email, password);

		const { error, message, object } = await createUser(newUserDTO);

		return !error
			? res.status(201).send(object)
			: res.status(400).send(message);
	}
);

export { router as userController };
