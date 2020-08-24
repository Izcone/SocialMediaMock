import { Request } from 'express';
import { IResponseHandler } from './../../handlers/responseHandler';
import { getUserInfo } from '../../repositories/MongoUserRepository';

const logIn = async (
	req: Request,
	userId: string
): Promise<IResponseHandler<any>> => {
	const user = getUserInfo(userId);

	console.log(userId, user);

	req.session!.userId = userId;

	if (!user) {
		return {
			error: true,
			message: 'Email or password are invalid!',
		};
	}

	return null;
};

export default logIn;
