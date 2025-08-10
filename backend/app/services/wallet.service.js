import * as walletRepository from "../repositories/wallet.repository.js";

export const getWallet = async (userId) => {
  const wallet = await walletRepository.getWallet(userId);
  if (!wallet) {
    throw new Error("Wallet not found");
  }
  return wallet;
};
