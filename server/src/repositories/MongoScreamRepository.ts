import { IScreamDTO } from './../useCases/Scream/ScreamDTO';
import { Scream } from '../entities/Scream';

export const addScream = async (scream: IScreamDTO): Promise<IScreamDTO> => {
	try {
		const newScream = await Scream.create(scream);
		return newScream;
	} catch (error) {
		console.log(error);
		return null;
	}
};
