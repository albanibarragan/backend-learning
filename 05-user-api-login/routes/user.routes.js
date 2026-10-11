import express from "express";
import {
  createUser,
  deleteUser,
  getUserId,
  getUsers,
  updateUser
} from "../controllers/user.controllers.js";

const userRoutes = express.Router();

// Definir rutas de usuario
userRoutes.get('/', getUsers);

// obtener un usuario
userRoutes.get('/:id', getUserId);

// crear un usuario 
userRoutes.post('/', createUser);

// Eliminar un usuario
userRoutes.delete('/:id', deleteUser);

userRoutes.put('/:id', updateUser);

export default userRoutes;