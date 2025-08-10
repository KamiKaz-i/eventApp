import db from "../config/db.config.js";

const User = db.User;
export const getAllUsers = async () => {
  const allUsers = await User.findAll();
  return allUsers;
};
export const getUser = async (username) => {
  const user = await User.findAll({
    where: {
      name: username,
    },
  });
  return user;
};
export const createUser = async (user) => {
  const newUser = await User.create({
    name: user.username,
    password: user.password,
    isFirstLogin: user.isFirstLogin,
  });
  return newUser;
};
