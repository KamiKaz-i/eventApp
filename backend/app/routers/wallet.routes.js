import express from "express";
import * as walletController from "../controllers/wallet.controller.js";
import { authorization } from "../middleware/userAuth.js";
let walletRouter = express.Router();

walletRouter.get("/", authorization, walletController.getWallet);

export default walletRouter;
