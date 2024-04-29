import express, { Request, Response, NextFunction } from 'express';
import prisma from "../../prisma/client";

const getUsers = (async (req: Request, res: Response, next: NextFunction) => {
  const users = await prisma.user.findMany();

  res.json(users);
});

const getUserById = (async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  if (!userId || !Number(userId)) return res.status(400).json({message: "Please provide a userId"});

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    }
  });

  if (!user) {
    return res.status(404).json({ message: `No user found with id ${req.params.userId}` });
  }

  res.json(user);
});

const addUser = (async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body.data;

  if (!data) return res.status(400).json({message: "No user data provided"});

  const { firstName, lastName, email } = data;

  if (!firstName) return res.status(400).json({message: "User must have first name"})
  if (!lastName) return res.status(400).json({message: "User must have last name"})
  if (!email) return res.status(400).json({message: "User must have email address"})

  const user = await prisma.user.create({
    data: req.body.data
  });

  res.json(user);
});

const updateUser = (async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body.data;
  const userId = req.params.userId;

  if (!data) return res.status(400).json({message: "No user data provided"});
  if (!userId) return res.status(400).json({message: "Please provide a userId"});

  const updatedUser = await prisma.user.update({
    data,
    where: {
      id: Number(userId)
    }
  });

  res.json(updatedUser);
});

const deleteUser = (async (req: Request, res: Response, next: NextFunction)=> {
  const userId = req.params.userId;

  if (!userId) return res.status(400).json({message: "Please provide a userId"});

  const user = await prisma.user.delete({
    where: {
      id: Number(userId)
    }
  });

  res.json(user);
})

export {
  addUser,
  deleteUser,
  getUsers,
  getUserById,
  updateUser
}