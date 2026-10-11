import {
  addUser as addUserModel,
  deleteUser as deleteUserModel,
  emailExists,
  getAllUsers,
  getUserById,
  updateUser as updateUserModel
} from "../models/user.model.js";

export const getUsers = (req, res) => {
  return res.json(getAllUsers());
};

export const createUser = (req, res) => {
  const { name, email } = req.body ?? {};

  if (typeof name !== "string" || !name.trim() ||
      typeof email !== "string" || !email.trim()) {
    return res.status(400).json({
      error: "El nombre y el correo electrónico son obligatorios."
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (emailExists(normalizedEmail)) {
    return res.status(409).json({
      error: "Ya existe un usuario con ese correo electrónico."
    });
  }

  const user = addUserModel({
    name: name.trim(),
    email: normalizedEmail
  });

  return res.status(201).json(user);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  const deleted = deleteUserModel(id);

  if (!deleted) {
    return res.status(404).json({ error: `No se encontró el usuario con ID ${id}.` });
  }

  return res.status(200).json({ message: `Usuario con ID ${id} eliminado.` });
};


export const getUserId = (req, res) => {
  const { id } = req.params;
  const user = getUserById(id);

  if (!user) {
    return res.status(404).json({ error: `No se encontró el usuario con ID ${id}.` });
  }

  return res.json(user);
};

export const updateUser = (req, res) => {
  const { id } = req.params;

  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    return res.status(400).json({ error: "El ID debe ser un UUID válido." });
  }

  const body = req.body;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "El cuerpo debe ser un objeto JSON." });
  }

  const fields = Object.keys(body);
  if (fields.length === 0 ||
      fields.some((field) => field !== "name" && field !== "email")) {
    return res.status(400).json({
      error: "Envía al menos name o email, y no incluyas otros campos."
    });
  }

  const updates = {};

  if (Object.hasOwn(body, "name")) {
    if (typeof body.name !== "string" || !body.name.trim()) {
      return res.status(400).json({ error: "El nombre debe ser una cadena no vacía." });
    }
    updates.name = body.name.trim();
  }

  if (Object.hasOwn(body, "email")) {
    if (typeof body.email !== "string" || !body.email.trim()) {
      return res.status(400).json({ error: "El correo electrónico debe ser una cadena no vacía." });
    }
    const normalizedEmail = body.email.trim().toLowerCase();

    if (emailExists(normalizedEmail, id)) {
      return res.status(409).json({
        error: "Ya existe un usuario con ese correo electrónico."
      });
    }
    updates.email = normalizedEmail;
  }

  const updatedUser = updateUserModel(id, updates);

  if (!updatedUser) {
    return res.status(404).json({ error: `No se encontró el usuario con ID ${id}.` });
  }

  return res.json(updatedUser);
};