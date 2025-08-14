import * as userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as walletRepository from "../repositories/wallet.repository.js";

export const register = async (user) => {
  try {
    const wallet = {};

    if (user.username.length === 0 || user.password.length === 0) {
      throw new Error("to short credentials");
    }
    const userByName = await userRepository.getUserByName(user.username);
    if (userByName) {
      throw new Error("User with this name already exists");
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    user.isFirstLogin = 1;

    const newUser = await userRepository.createUser(user);
    if (newUser.dataValues.id) {
      wallet.user_id = newUser.dataValues.id;
      wallet.balance = 0;
      const usersWallet = await walletRepository.createWallet(wallet);
    }
    return { userCreated: true, user: newUser.dataValues };
  } catch (error) {
    throw error;
  }
};

export const get = async () => {
  try {
    const results = await userRepository.getAllUsers();
    return results;
  } catch (error) {
    throw error;
  }
};

export const login = async (user) => {
  try {
    const result = await userRepository.getUserByName(user.username);
    if (!result) {
      throw new Error(`invalid credentials`);
    }
    const isAuthenticated = await bcrypt.compare(
      user.password,
      result.password
    );
    if (isAuthenticated) {
      const token = jwt.sign(
        {
          username: user.username,
        },
        process.env.JWT_SECRET
      );
      return {
        username: user.username,
        token: token,
        authenticated: true,
        isFirstLogin: result.isFirstLogin,
      };
    } else {
      throw new Error(`invalid credentials`);
    }
  } catch (error) {
    throw error;
  }
};
