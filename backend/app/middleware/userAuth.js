import jwt from "jsonwebtoken";
import db from "../config/db.config.js";
let User = db.User;
let Wallet = db.Wallet;
export const authorization = async (req, res, next) => {
  let authHeaders = req.headers["authorization"];
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.sendStatus(403);
  }
  let token = authHeaders.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded;
  });
  if (!req.user.username) {
    return res.status(404).json({ error: "missing user" });
  }
  let user = await User.findOne({
    where: {
      name: req.user.username,
    },
    include: [{ model: Wallet, attributes: ["id"] }],
  });

  req.user.id = user.id;
  req.user.walletId = user.Wallet.id;

  if (user.length === 0) {
    return res.status(404).json({
      message: "user doesn't exist",
    });
  }

  next();
};
