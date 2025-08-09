import bcrypt from "bcrypt";
import User, { IUser } from "../models/usersModels";

const saltRounds = 10;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

async function createUser(data: Partial<IUser>) {
  if (data.password) {
    data.password = await hashPassword(data.password);
  }
  const user = new User(data);
  return user.save();
}

async function getUserById(id: string) {
  return User.findById(id);
}

async function getUserByAuthId(authId: string) {
  return User.findOne({ authId });
}

async function updateUser(id: string, updates: Partial<IUser>) {
  if (updates.password) {
    updates.password = await hashPassword(updates.password);
  }
  return User.findByIdAndUpdate(id, updates, { new: true });
}

async function deleteUser(id: string) {
  return User.findByIdAndDelete(id);
}

export {
  createUser,
  getUserById,
  getUserByAuthId,
  updateUser,
  deleteUser,
  hashPassword,
  verifyPassword,
};
