import { randomUUID } from "node:crypto";

const users = [];

export const getAllUsers = () => {
  return users;
};

export const addUser = (user) => {
  const newUser = { ...user, id: randomUUID() };
  users.push(newUser);
  return newUser;
};

export const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return false;
  }

  users.splice(index, 1);
  return true;
};

export const getUserById = (id) => {
 return users.find((user) => user.id === id) || null;
};

export const emailExists = (email, excludedId = null) => {
  const normalizedEmail = email.trim().toLowerCase();

  return users.some((user) =>
    user.id !== excludedId &&
    user.email.trim().toLowerCase() === normalizedEmail
  );
};

export const updateUser = (id, updatedData) => {
  const user = users.find((user) => user.id === id);

  if (!user) {
    return null;
  }

    Object.assign(user, updatedData);
    return user;
};