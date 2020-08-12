import { Router } from 'express';
import { authRouter } from './routes/auth';

const router = Router();

router.use('/api/user', authRouter);

export { router };
