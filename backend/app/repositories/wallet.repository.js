import db from "../config/db.config.js";
const Wallet = db.Wallet;
export const getWallet = async (userId, t = null) => {
  try {
    const wallet = await db.Wallet.findOne({
      where: {
        user_id: userId,
      },
      transaction: t,
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
export const increment = async (walletId, therealamount, dbTransaction) => {
  await Wallet.increment(
    { balance: therealamount },
    {
      where: {
        id: walletId,
      },
      transaction: dbTransaction,
    }
  );
};
export const incrementPendingBalance = async (
  walletId,
  therealamount,
  dbTransaction
) => {
  await Wallet.increment(
    { pending_balance: therealamount },
    {
      where: {
        id: walletId,
      },
      transaction: dbTransaction,
    }
  );
};
