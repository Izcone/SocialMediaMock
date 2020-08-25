import { Request } from 'express';
import { IResponseHandler } from './../../handlers/responseHandler';
import { getUserInfo } from '../../repositories/MongoUserRepository';

export const isLoggedIn = (req: Request) => !!req.session!.userId;

const logIn = async (
	req: Request,
	userId: string
): Promise<IResponseHandler<any>> => {
	const user = await getUserInfo(userId);

	req.session!.userId = userId;

	if (!user) {
		return {
			error: true,
			message: 'Email or password are invalid!',
		};
	}

	return {
		error: false,
		message: '',
		object: user,
	};
};

export default logIn;
