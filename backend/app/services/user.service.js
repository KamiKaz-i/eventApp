import * as userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as walletRepository from "../repositories/wallet.repository.js";

export const register = async (user) => {
  try {
    let wallet = {};
    if (user.username.length === 0 || user.password.length === 0) {
      throw new Error("to short credentials");
    }
    const users = await userRepository.getUser(user.username);
    if (users.length > 0) {
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
    throw new Error(`something went wrong ${error}`);
  }
};

export const get = async () => {
  try {
    const results = await userRepository.getAllUsers();
    return results;
  } catch (error) {
    throw new Error(`something went wrong ${error}`);
  }
};
//nie ma znaczenie czy duze czy male znaki w loginie do sprawdzenia
export const login = async (user) => {
  try {
    const result = await userRepository.getUser(user.username);

    if (result.length === 0) {
      throw new Error(`invalid credentials`);
    }
    const userD = result[0].dataValues;
    let isAuthenticated = await bcrypt.compare(user.password, userD.password);
    if (isAuthenticated) {
      let token = jwt.sign(
        {
          username: user.username,
        },
        process.env.JWT_SECRET
      );
      return {
        username: user.username,
        token: token,
        authenticated: true,
        isFirstLogin: userD.isFirstLogin,
      };
    } else {
      throw new Error(`invalid credentials`);
    }
  } catch (error) {
    throw new Error(`something went wrong ${error}`);
  }
};
