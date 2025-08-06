import express from "express";
import * as orderTicketController from "../controllers/orderTicket.controller.js";
import { authorization } from "../middleware/userAuth.js";
let orderTicketRouter = express.Router();

orderTicketRouter.post(
  "/",
  authorization,
  orderTicketController.postOrderTicket
);
orderTicketRouter.put(
  "/:ticketOrderId",
  authorization,
  orderTicketController.putOrderTicket
);
orderTicketRouter.delete(
  "/:ticketOrderId",
  authorization,
  orderTicketController.deleteOrderTicket
);
orderTicketRouter.get(
  "/order/:userId",
  authorization,
  orderTicketController.getOrderTicket
);
export default orderTicketRouter;
