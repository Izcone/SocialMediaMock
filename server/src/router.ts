import { Router } from 'express';

import { authController } from './useCases/Auth/AuthController';

const router = Router();

router.use('/api/auth', authController);

export { router };
