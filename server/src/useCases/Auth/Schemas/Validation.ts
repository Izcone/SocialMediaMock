import { IResponseHandler } from './../../../handlers/responseHandler';
import { BCRYPT_MAX_BYTES } from './../../../config/auth';
import Joi, { ObjectSchema } from '@hapi/joi';

const email = Joi.string()
	.email()
	.min(8)
	.max(256)
	.lowercase()
	.trim()
	.required();

const name = Joi.string().min(3).max(128).trim().required();

const password = Joi.string()
	.min(8)
	.max(BCRYPT_MAX_BYTES, 'utf8')
	.regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
	.message(
		'{#label} must contain one uppercase letter, one lowercase letter, and one digit'
	)
	.required();

const confirmPassword = Joi.valid(Joi.ref('password')).required();

export const registerSchema = Joi.object({
	email,
	name,
	password,
	confirmPassword,
});

export const loginSchema = Joi.object({
	email,
	password,
});

export const validate = async (
	schema: ObjectSchema,
	payload: any
): Promise<IResponseHandler<string>> => {
	try {
		await schema.validateAsync(payload, { abortEarly: false });
		return {
			error: false,
			message: '',
		};
	} catch (error) {
		return {
			error: true,
			message: error.details.map((details: any) => details.message),
		};
	}
};
