import { auth } from './../../middleware/auth';
import { Router, Request, Response } from 'express';
import createScream from './CreateScreamUseCase';

const router = Router();

router.post(
	'/add',
	auth,
	async (req: Request, res: Response): Promise<Response> => {
		const { userId } = req.session!;
		const { body } = req.body;

		const { error, message } = await createScream(userId, body);

		return error ? res.status(400).send(message) : res.status(201);
	}
);

export { router as ScreamController };
