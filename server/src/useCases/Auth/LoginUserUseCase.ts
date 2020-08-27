import { Request } from 'express';
import { IResponseHandler } from './../../handlers/responseHandler';
import { getUserInfo } from '../../repositories/MongoUserRepository';

export const isLoggedIn = (req: Request) => !!req.session!.userId;

const logIn = async (
	req: Request,
	userId?: string,
	email?: string,
	password?: string
): Promise<IResponseHandler<any>> => {
	if (userId) {
		req.session!.userId = userId;
		return;
	}

	const user = await getUserInfo('', email);

	if (!user || !(await user.matchesPassword(password))) {
		return {
			error: true,
			message: 'Email or password are invalid!',
		};
	}

	req.session!.userId = user._id;

	return {
		error: false,
		message: 'Logged in',
	};
};

export default logIn;
