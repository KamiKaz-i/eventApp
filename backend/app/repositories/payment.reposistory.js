import { Transaction } from "sequelize";
import db from "../config/db.config.js";
export const createPayment = async (paymentInfo, dbTransaction) => {
  await db.Payment.create(paymentInfo, { transaction: dbTransaction });
};
