import {Router, Request, Response} from 'express';
import Auth from '../middleware/auth';
const router = Router();

router.get('/', new Auth().middleware, (_req: Request, res: Response) => {
    res.send('accses allowed');
});
export default router;