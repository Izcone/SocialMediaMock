export interface IResponseHandler<T> {
	error: boolean;
	message: any;
	object?: T;
}
