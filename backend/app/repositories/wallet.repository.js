import db from "../config/db.config.js";
const Wallet = db.Wallet;
export const getWallet = async (userId) => {
  try {
    const wallet = await db.Wallet.findOne({
      where: {
        user_id: userId,
      },
    });
    return wallet;
  } catch (error) {
    throw new Error(`db error ${error}`);
  }
};
export const createWallet = async (wallet) => {
  const usersWallet = await Wallet.create(wallet);
  return usersWallet;
};

export const getWalletByPk = async (walletId, dbTransaction) => {
  const wallet = await Wallet.findByPk(walletId, {
    transaction: dbTransaction,
  });
  return wallet;
};
