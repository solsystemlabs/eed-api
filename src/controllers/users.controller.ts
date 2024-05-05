import { Request, Response, NextFunction } from 'express';
import prisma from "../../prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const getUsers = (async (req: Request, res: Response, next: NextFunction) => {
  const users = await prisma.user.findMany();

  res.json(users);
});

const getUserById = (async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  if (!userId || !Number(userId)) {
    return res.status(400).json({ message: "Please provide a userId, Rachel" });
  }

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
  const { firstName, lastName, email, password } = req.body;

  if (!firstName) {
    return res.status(400).json({ message: "User must have first name" })
  }
  if (!lastName) {
    return res.status(400).json({ message: "User must have last name" })
  }
  if (!email) {
    return res.status(400).json({ message: "User must have email address" })
  }
  if (!password) {
    return res.status(400).json({ message: "User must have password" })
  }

  const data = req.body;

  data.password = bcrypt.hashSync(req.body.password, 8);

  try {
    const user = await prisma.user.create({
      data
    });

    res.json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

const updateUser = (async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const userId = req.params.userId;

  if (!data) {
    return res.status(400).json({ message: "No user data provided" });
  }
  if (!userId) {
    return res.status(400).json({ message: "Please provide a userId" });
  }

  if (req.body.password) {
    data.password = bcrypt.hashSync(req.body.password, 8);
  }

  const updatedUser = await prisma.user.update({
    data,
    where: {
      id: Number(userId)
    }
  });

  res.json(updatedUser);
});

const deleteUser = (async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ message: "Please provide a userId" });
  }

  const user = await prisma.user.delete({
    where: {
      id: Number(userId)
    }
  });

  res.json(user);
});

const loginUser = (async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email) {
    return res.status(400).send({ message: "No user email provided" });
  }
  if (!req.body.password) {
    return res.status(400).send({ message: "No user password provided" });
  }
  if (!process.env.SIGNING_SECRET) {
    return res.status(500).send({ message: "Failed to load signing secret" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    });

    if (!user) {
      return res.status(404)
      .send({
        message: "User Not found."
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401)
      .send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({
      id: user.id
    },
      process.env.SIGNING_SECRET,
      {
      expiresIn: '20m'
    });

    // const refreshToken = jwt.sign({
    //   email: user.email
    // }, process.env.)

    res.status(200)
    .send({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.firstName + " " + user.lastName,
      },
      message: "Login successful",
      accessToken: token,
    });
  } catch (err) {

  }
});

export {
  addUser,
  deleteUser,
  getUsers,
  getUserById,
  loginUser,
  updateUser
}