import { Router, Request, Response } from 'express';
import { UserDTO } from './UserDTO';
import { registerSchema, loginSchema } from './Schemas/Validation';
import createUser from './CreateUserUseCase';
import logIn from './LoginUserUseCase';

const router = Router();

router.post(
	'/register',
	async (req: Request, res: Response): Promise<Response> => {
		await registerSchema.validateAsync(req.body, { abortEarly: false });

		const { name, email, password } = req.body;
		const newUserDTO = new UserDTO(name, email, password);

		const { error, message, object } = await createUser(newUserDTO);

		if (!error) {
			console.log(object);
			logIn(req, object.id);
			return res.status(201).send();
		}

		return res.status(400).send(message);
	}
);

router.post(
	'/login',
	async (req: Request, res: Response): Promise<Response> => {
		await loginSchema.validateAsync(req.body, { abortEarly: false });

		return res.status(2);
	}
);

export { router as userController };
