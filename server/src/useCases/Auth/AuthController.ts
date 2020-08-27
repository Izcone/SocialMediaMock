import { guest, auth } from '../../middleware/auth';
import { Router, Request, Response } from 'express';
import { UserDTO } from './UserDTO';
import { registerSchema, loginSchema, validate } from './Schemas/Validation';
import registerUser from './RegisterUserUseCase';
import logIn from './LoginUserUseCase';
import logOut from './LogoutUserUseCase';

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
	guest,
	async (req: Request, res: Response): Promise<Response> => {
		const valid = await validate(loginSchema, req.body);

		if (valid.error) {
			return res.status(400).send(valid.message);
		}

		const { email, password } = req.body;

		const { error, message } = await logIn(req, '', email, password);

		if (!error) {
			return res.status(200).send();
		}

		return res.status(401).send(message);
	}
);

router.post('/logout', auth, async (req: Request, res: Response) => {
	const { error, message } = await logOut(req, res);

	if (!error) {
		return res.status(200).send();
	}

	return res.status(401).send(message);
});

export { router as authController };
