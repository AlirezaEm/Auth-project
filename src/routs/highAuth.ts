import { Router, Request, Response } from 'express';
import Auth from '../middleware/auth';
import highAuth from '../middleware/highLevelAuth';
const router = Router();

router.get('/', [new Auth().middleware, highAuth] , (_req: Request, res: Response) => {
    res.send('high accses allowed');
});
export default router;