import express from "express";
import { authorization } from "../middleware/userAuth.js";
import * as userController from "../controllers/user.controller.js";

let userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.get("/", authorization, userController.get);
userRouter.post("/login", userController.login);
userRouter.get("/validate-token", authorization, userController.validateToken);
export default userRouter;
