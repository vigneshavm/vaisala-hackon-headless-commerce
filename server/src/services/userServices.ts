import bcrypt from "bcrypt";
import User, { IUser } from "../models/usersModels";

export const createUser = async (data: Partial<IUser>) => {
    if (data.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
      data.password = hashedPassword;
    }
    const user = new User(data);
    return await user.save();
  };

export const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
}
export const getUserById = async (id: string) => {
  return await User.findById(id);
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const getUserByAuthId = async (authId: string) => {
  return await User.findOne({ authId });
};

export const updateUser = async (id: string, updates: Partial<IUser>) => {
  return await User.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};
