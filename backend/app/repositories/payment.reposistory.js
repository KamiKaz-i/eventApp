import db from "../config/db.config.js";
export const createPayment = async (paymentInfo) => {
  await db.Payment.create(paymentInfo);
};
