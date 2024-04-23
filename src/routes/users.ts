import express, { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/client';

const router = express.Router();

/* GET users listing. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('respond with a resources');
});

router.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(req.params.userId),
    },
  });

  res.send(user);
})

export default router;
