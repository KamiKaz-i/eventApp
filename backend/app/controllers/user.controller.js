import db from "../config/db.config.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import * as userService from "../services/user.service.js";
import * as walletRepository from "../repositories/wallet.repository.js";
const User = db.User;
const Wallet = db.Wallet;
export const register = async (req, res) => {
  let user = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const freshAccount = await userService.register(user);
    console.log(freshAccount);

    res.status(200).json(freshAccount);
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const results = await userService.get();
    res.status(200).json({
      user: results,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fail",
      error: error.message,
    });
  }
};
export const setStatus = async (req, res) => {
  try {
    await User.update(
      { isFirstLogin: req.body.isFirstLogin },
      {
        where: {
          name: req.user.username,
        },
      }
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export const status = async (req, res) => {
  try {
    const result = await User.findAll({
      where: {
        name: {
          [Op.eq]: req.user.username,
        },
      },
    });
    const user = result[0].dataValues;
    res.status(200).json({
      isFirstLogin: user.isFirstLogin,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
//nie ma znaczenie czy duze czy male znaki w loginie do sprawdzenia
export const login = async (req, res) => {
  try {
    let user = {
      username: req.body.username,
      password: req.body.password,
    };
    const result = await userService.login(user);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const validateToken = (req, res) => {
  res.status(200).json(req.user);
};
