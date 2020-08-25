import { isLoggedIn } from './../useCases/Auth/LoginUserUseCase';
import { Request, Response, NextFunction } from 'express';

export const guest = (req: Request, res: Response, next: NextFunction) => {
	if (isLoggedIn(req)) {
		return res.status(400).send({ message: 'You are already logged in' });
	}

	next();
};
