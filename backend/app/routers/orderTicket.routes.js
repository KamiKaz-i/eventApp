import express from "express";
import * as orderTicketController from "../controllers/orderTicket.controller.js";
import { authorization } from "../middleware/userAuth.js";
let orderTicketRouter = express.Router();

orderTicketRouter.post("/", authorization, orderTicketController.create);
orderTicketRouter.put(
  "/:ticketOrderId",
  authorization,
  orderTicketController.update
);
orderTicketRouter.delete(
  "/:ticketOrderId",
  authorization,
  orderTicketController.remove
);
orderTicketRouter.get(
  "/order/:userId",
  authorization,
  orderTicketController.get
);
orderTicketRouter.post(
  "/return",
  authorization,
  orderTicketController.returnTicket
);
export default orderTicketRouter;
