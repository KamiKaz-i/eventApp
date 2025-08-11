import db from "../config/db.config.js";

const User = db.User;
export const getAllUsers = async () => {
  const allUsers = await User.findAll();
  return allUsers;
};
export const getUser = async (options) => {
  const user = await User.findAll({
    where: {
      ...options,
    },
  });
  return user[0].dataValues;
};

export const createUser = async (user) => {
  const newUser = await User.create({
    name: user.username,
    password: user.password,
    isFirstLogin: user.isFirstLogin,
  });
  return newUser;
};
