export interface IUserDTO {
	id?: string;
	name: string;
	email: string;
	password: string;
}

export class UserDTO {
	public name: string;
	public email: string;
	public password: string;

	constructor(name: string, email: string, password: string) {
		this.name = name;
		this.email = email;
		this.password = password;
	}
}
