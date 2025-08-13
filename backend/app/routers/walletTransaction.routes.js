import express from "express";
import * as walletTransaction from "../controllers/walletTransaction.controller.js";
import { authorization } from "../middleware/userAuth.js";
let walletTransactionRouter = express.Router();

walletTransactionRouter.get(
  "/:id",
  authorization,
  walletTransaction.getTransactions
);
walletTransactionRouter.post(
  "/",
  authorization,
  walletTransaction.postTransaction
);
walletTransactionRouter.post(
  "/deposit",
  authorization,
  walletTransaction.postDeposit
);
walletTransactionRouter.post(
  "/withdraw",
  authorization,
  walletTransaction.postWithdraw
);
export default walletTransactionRouter;
