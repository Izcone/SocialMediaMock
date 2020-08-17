import { Scream, IScream } from '../entities/Scream';

export const addScream = async (scream: IScream): Promise<IScream> => {
	const newScream = await Scream.create(scream);
	return newScream;
};
