export interface IResponseHandler<T> {
	error: boolean;
	message: string;
	object?: T;
}
