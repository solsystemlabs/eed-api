import express from 'express';
import { addUser, deleteUser, getUserById, getUsers, loginUser, updateUser } from "../controllers/users.controller";
import authenticateToken from "../middlewares/authorization";

const router = express.Router();

router.get('/', authenticateToken, getUsers);

router.get('/:userId', getUserById);

router.post('/', addUser);

router.post('/login', loginUser);

router.patch('/:userId', updateUser);

router.delete('/:userId', deleteUser);

export default router;
