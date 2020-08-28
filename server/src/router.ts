import { Router } from 'express';

import { authController } from './useCases/Auth/AuthController';
import { ScreamController } from './useCases/Scream/ScreamController';

const router = Router();

router.use('/api/auth', authController);

router.use('/api/scream', ScreamController);

export { router };
