import { Router, Request, Response } from 'express';
const router = Router();
router.get('/', (_req: Request, res: Response) => {
    res.send('public interface without authorization.')
});
export default router;


