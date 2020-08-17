import { Router, Request, Response } from 'express';

const router = Router();

router.post(
	'/add',
	async (req: Request, res: Response): Promise<Response> => {
		const { scream, username } = req.body;
		return;
	}
);
