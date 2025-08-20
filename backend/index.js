import express from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./app/routers/user.routes.js";
import eventRouter from "./app/routers/event.routes.js";
import walletRouter from "./app/routers/wallet.routes.js";
import orderRouter from "./app/routers/order.routes.js";
import walletTransactionRouter from "./app/routers/walletTransaction.routes.js";
import orderTicketRouter from "./app/routers/orderTicket.routes.js";
const app = express();

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(
  cors({ origin: "https://eventapp-1-nxbr.onrender.com", credentials: true })
);
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/wallets", walletRouter);
app.use("/api/wallet-transactions", walletTransactionRouter);
app.use("/api/order-tickets", orderTicketRouter);
app.use("/api/order", orderRouter);
app.listen(process.env.PORT, () => {
  console.log(`running on port ${process.env.PORT}`);
});
