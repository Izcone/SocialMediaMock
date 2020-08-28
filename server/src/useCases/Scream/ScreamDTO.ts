export interface IScreamDTO {
	id?: String;
	userId: String;
	body: String;
}

export class ScreamDTO implements IScreamDTO {
	public userId: string;
	public body: string;

	constructor(userId: string, body: string) {
		this.userId = userId;
		this.body = body;
	}
}
