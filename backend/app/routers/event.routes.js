import express from "express";
import * as eventController from "../controllers/event.controller.js";
import { authorization } from "../middleware/userAuth.js";
let eventRouter = express.Router();

eventRouter.get("/", authorization, eventController.getEvents);
eventRouter.get("/myEvents", authorization, eventController.getMyEvents);
eventRouter.post("/", authorization, eventController.postEvent);
eventRouter.get("/:eventId", authorization, eventController.getEvent);
eventRouter.put("/:eventId", authorization, eventController.putEvent);
eventRouter.delete("/:eventId", authorization, eventController.deleteEvent);
export default eventRouter;
