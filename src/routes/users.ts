import express from 'express';
import { addUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/users.controller";

const router = express.Router();

router.get('/', getUsers);

router.get('/:userId', getUserById);

router.post('/', addUser);

router.patch('/:userId', updateUser);

router.delete('/:userId', deleteUser);

export default router;
