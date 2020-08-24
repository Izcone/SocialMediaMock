import { Router } from 'express';

import { userController } from './useCases/auth/UserController';

const router = Router();

router.use('/api/user', userController);

export { router };
