import { Router } from 'express';
import { userController } from '../controller/user.js';

export const usersRouter = Router();

usersRouter.get('/', userController.getAllUsers);

usersRouter.get('/:id', userController.getUserById);

usersRouter.post('/', userController.createUser);

usersRouter.patch('/:id', userController.updateUser);

usersRouter.put('/:id', userController.replaceUser);

usersRouter.delete('/:id', userController.deleteUser);