import * as walletService from "../services/wallet.service.js";
export const getWallet = async (req, res) => {
  try {
    const wallet = await walletService.getWallet(req.user.id);
    res.status(200).json({
      id: wallet.id,
      balance: wallet.balance,
      updatedAt: wallet.updatedAt,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};
