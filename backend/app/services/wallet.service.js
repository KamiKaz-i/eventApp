import * as walletRepository from "../repositories/wallet.repository.js";
import { findEventsForRelease } from "../repositories/event.repository.js";

export const getWallet = async (userId) => {
  const wallet = await walletRepository.getWallet(userId);
  if (!wallet) {
    throw new Error("Wallet not found");
  }
  return wallet;
};
export const releasePendingFunds = async (transaction = null) => {
  const result = await findEventsForRelease(transaction);

  for (const event of result) {
    const ticketsSold = event.total_tickets - event.Ticket.quantity_available;
    if (ticketsSold > 0) {
      const revenue = ticketsSold * parseFloat(event.Ticket.price);

      const wallet = await walletRepository.getWallet(
        event.organizer_id,
        transaction
      );
      console.log(revenue);
      if (wallet) {
        console.log(wallet);
        wallet.pending_balance = parseFloat(wallet.pending_balance) - revenue;
        wallet.balance = parseFloat(wallet.balance) + revenue;

        await wallet.save({ transaction: transaction });
        event.isFinished = true;
        await event.save({ transaction: transaction });
        console.log(wallet);
      }
    } else {
      event.isFinished = true;
      await event.save({ transaction: transaction });
    }
  }
  return result;
};
