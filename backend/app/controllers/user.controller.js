import * as userService from "../services/user.service.js";
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
