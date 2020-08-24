import Joi from '@hapi/joi';

export const registerSchema = Joi.object({
	email: Joi.string().email().min(8).max(256).lowercase().trim().required(),
	name: Joi.string().min(3).max(128).trim().required(),
	password: Joi.string().min(8).max(128).required(),
	confirmPassword: Joi.valid(Joi.ref('password')).required(),
});

export const loginSchema = Joi.object({
	email: Joi.string().email().min(8).max(256).lowercase().trim().required(),
	password: Joi.string().min(8).max(128).required(),
});
