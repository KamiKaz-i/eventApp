import express from "express";
import * as orderController from "../controllers/order.controller.js";
import { authorization } from "../middleware/userAuth.js";
let orderRouter = express.Router();

orderRouter.get("/user/:id", authorization, orderController.getOrder);

export default orderRouter;
