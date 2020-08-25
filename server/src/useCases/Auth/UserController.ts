import { guest } from './../../middleware/auth';
import { Router, Request, Response } from 'express';
import { UserDTO } from './UserDTO';
import { registerSchema, loginSchema, validate } from './Schemas/Validation';
import registerUser from './RegisterUserUseCase';
import logIn from './LoginUserUseCase';

const router = Router();

router.post(
	'/register',
	guest,
	async (req: Request, res: Response): Promise<Response> => {
		const valid = await validate(registerSchema, req.body);

		if (valid.error) {
			return res.status(400).send(valid.message);
		}

		const { name, email, password } = req.body;
		const newUserDTO = new UserDTO(name, email, password);

		const { error, message, object } = await registerUser(newUserDTO);

		if (!error) {
			await logIn(req, object.id);
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
