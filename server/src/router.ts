import { Router } from 'express';

import { userController } from './useCases/User/UserController';

const router = Router();

router.use('/api/user', userController);

export { router };
