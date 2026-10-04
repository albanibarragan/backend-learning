import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../config.js';
import { USER_FIELDS, UserModel } from '../models/user.js';

const hasRequiredUserFields = user =>
  USER_FIELDS.every(field => typeof user[field] === 'string' && user[field].trim().length > 0);

export class userController {
  static getAllUsers(req, res) {
    const limit = req.query.limit === undefined ? DEFAULT_LIMIT : Number(req.query.limit);
    const offset = req.query.offset === undefined ? DEFAULT_OFFSET : Number(req.query.offset);
    if (!Number.isInteger(limit) || limit < 1 || !Number.isInteger(offset) || offset < 0) {
      return res.status(400).json({ error: 'limit debe ser positivo y offset no negativo' });
    }

    const users = UserModel.findAll({
      limit,
      offset,
      name: req.query.name,
      lastname: req.query.lastname,
      username: req.query.username
    });
    res.json(users);
  }

  static getUserById(req, res) {
    const user = UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
  }

  static createUser(req, res) {
    const newUserData = req.body ?? {};
    if (!hasRequiredUserFields(newUserData)) {
      return res.status(400).json({ error: 'name, lastname y username son obligatorios' });
    }

    const newUser = UserModel.create(newUserData);
    res.status(201).json(newUser);
  }

  static updateUser(req, res) {
    const currentUser = UserModel.findById(req.params.id);
    if (!currentUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const updates = req.body ?? {};
    const updateFields = Object.keys(updates);
    if (updateFields.some(field => !USER_FIELDS.includes(field)) || !hasRequiredUserFields({ ...currentUser, ...updates })) {
      return res.status(400).json({ error: 'Los cambios del usuario no son válidos' });
    }

    res.json(UserModel.update(req.params.id, updates));
  }

  static replaceUser(req, res) {
    if (!UserModel.findById(req.params.id)) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const replacement = req.body ?? {};
    if (!hasRequiredUserFields(replacement)) {
      return res.status(400).json({ error: 'name, lastname y username son obligatorios' });
    }

    res.json(UserModel.replace(req.params.id, replacement));
  }

  static deleteUser(req, res) {
    if (!UserModel.delete(req.params.id)) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(204).end();
  }
}