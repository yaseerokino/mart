import { Response, Request, Router } from 'express';

const router = Router();

const index = (req: Request, res: Response) => res.json({ message: 'You have hit Mart API endpoint' });

router.get('', index);

module.exports = router;
