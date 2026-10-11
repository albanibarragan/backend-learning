import { randomUUID } from "node:crypto";

const users = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    name: "Ana Lopez",
    email: "ana@example.com"
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    name: "Carlos Perez",
    email: "carlos@example.com"
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    name: "Maria Torres",
    email: "maria@example.com"
  }
];

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