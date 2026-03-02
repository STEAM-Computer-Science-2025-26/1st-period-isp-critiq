// db/mockStore.js
const crypto = require("crypto");

const users = [];
const sessions = new Map();

function createUser(email, passwordHash) {
  const user = {
    id: crypto.randomUUID(),
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

function findUserByEmail(email) {
  return users.find((u) => u.email === email);
}

function findUserById(id) {
  return users.find((u) => u.id === id);
}

function createSession(userId) {
  const token = crypto.randomUUID();
  sessions.set(token, userId);
  return token;
}

function deleteSession(token) {
  sessions.delete(token);
}

function getUserIdFromSession(token) {
  return sessions.get(token);
}

module.exports = {
  users,
  sessions,
  createUser,
  findUserByEmail,
  findUserById,
  createSession,
  deleteSession,
  getUserIdFromSession,
};