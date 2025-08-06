import db from "../config/db.config.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";

const User = db.User;
const Wallet = db.Wallet;
export const register = async (req, res) => {
  let user = {};
  let wallet = {};
  try {
    if (req.body.username.length === 0 || req.body.password.length === 0) {
      return res.status(401).json({
        message: `to short credentials`,
      });
    }
    user.name = req.body.username;
    const users = await User.findAll({
      where: {
        name: user.name,
      },
    });
    if (users.length > 0) {
      return res.status(409).json({
        message: `User with this name already exists`,
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    user.isFirstLogin = 1;
    const newUser = await User.create(user);
    if (newUser.dataValues.id) {
      wallet.user_id = newUser.dataValues.id;
      wallet.balance = 0;
      const usersWallet = await Wallet.create(wallet);
    }
    res.status(200).json({
      userCreated: true,
      user: newUser.dataValues,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const results = await User.findAll();
    res.status(200).json({
      user: results,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
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
      message: "server error",
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
      message: "server error",
      error: error.message,
    });
  }
};
//nie ma znaczenie czy duze czy male znaki w loginie do sprawdzenia
export const login = async (req, res) => {
  try {
    const result = await User.findAll({
      where: {
        name: {
          [Op.eq]: req.body.username,
        },
      },
    });

    if (result.length === 0) {
      return res.status(401).json({
        message: `invalid credentials`,
      });
    }
    const user = result[0].dataValues;
    let isAuthenticated = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isAuthenticated) {
      let token = jwt.sign(
        {
          username: req.body.username,
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({
        username: `${req.body.username}`,
        token: token,
        authenticated: true,
        isFirstLogin: user.isFirstLogin,
      });
    } else {
      res.status(401).json({
        message: `invalid credentials`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

export const validateToken = (req, res) => {
  res.status(200).json(req.user);
};
