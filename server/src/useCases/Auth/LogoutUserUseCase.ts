import { IResponseHandler } from './../../handlers/responseHandler';
import { Request, Response } from 'express';
import { SESSION_NAME } from '../../config';

const logOut = async (
	req: Request,
	res: Response
): Promise<IResponseHandler<any>> => {
	req.session!.destroy(
		(err: Error): IResponseHandler<any> => {
			if (err) {
				return {
					error: true,
					message: err,
				};
			}
		}
	);

	res.clearCookie(SESSION_NAME);

	return {
		error: false,
		message: '',
	};
};

export default logOut;
