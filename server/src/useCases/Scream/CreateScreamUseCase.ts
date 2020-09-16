import { addScream } from './../../repositories/MongoScreamRepository';
import { IResponseHandler } from './../../handlers/responseHandler';

import { ScreamDTO, IScreamDTO } from './ScreamDTO';

const createScream = async (
	userId: string,
	body: string
): Promise<IResponseHandler<string>> => {
	const newScream = new ScreamDTO(userId, body);

	const valid = await addScream(newScream);

	if (valid !== null) {
		return {
			error: false,
			message: '',
		};
	}

	return {
		error: true,
		message: 'Could not add new scream',
	};
};

export default createScream;
