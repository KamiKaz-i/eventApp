import db from "../config/db.config.js";
let Wallet = db.Wallet;
export const getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({
      where: {
        user_id: req.user.id,
      },
    });

    res
      .status(200)
      .json({
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
