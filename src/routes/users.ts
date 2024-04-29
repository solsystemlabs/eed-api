import express, { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/client';

const router = express.Router();

/* GET users listing. */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const users = await prisma.user.findMany();

  res.send(users);
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
