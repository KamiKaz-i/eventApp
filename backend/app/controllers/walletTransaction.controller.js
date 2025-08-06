import db from "../config/db.config.js";

let WalletTransaction = db.Wallet_transaction;
let Wallet = db.Wallet;
let Payment = db.Payment;
let Order = db.Order;
let Ticket = db.Ticket;
let OrderTicket = db.Order_ticket;
let Event = db.Event;
let User = db.User;
export const getTransactions = async (req, res) => {
  try {
    const walletId = req.params.id;
    const walletTransactions = await WalletTransaction.findAll({
      where: {
        wallet_id: walletId,
      },
    });

    res.status(200).json(walletTransactions);
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};
export const postTransaction = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    let walletId = req.body.walletId;
    let transactionType = req.body.transactionType;
    let orderId = req.body.orderId;
    let amount = parseFloat(req.body.amount) || null;

    if (transactionType === "deposit" || transactionType === "withdraw") {
      if (!amount || !transactionType || !walletId) {
        return res.status(400).json({ message: "missing info" });
      }

      let transaction = {
        wallet_id: walletId,
        amount: amount,
        transaction_type: transactionType,
      };

      let therealamount = transactionType === "deposit" ? amount : -amount;
      if (transactionType === "withdraw") {
        const currentBalance = await Wallet.findByPk(walletId, {
          transaction: t,
        });
        let newBalance =
          parseFloat(currentBalance.dataValues.balance) + therealamount;
        if (newBalance < 0) {
          await t.rollback();
          return res.status(400).json({
            message: "insufficient funds",
          });
        }
      }
      await WalletTransaction.create(transaction, { transaction: t });

      await Wallet.increment(
        { balance: therealamount },
        {
          where: {
            id: walletId,
          },
          transaction: t,
        }
      );
      const updatedWallet = await Wallet.findByPk(walletId, { transaction: t });
      await t.commit();
      res.status(200).json({
        wallet: updatedWallet.dataValues,
      });
    }

    if (transactionType === "purchase") {
      if (!walletId || !transactionType || !orderId) {
        return res.status(400).json({
          message: "missing INFO",
        });
      }
      const orderTickets = await OrderTicket.findAll({
        where: {
          order_id: orderId,
        },
        include: [
          {
            model: Ticket,
            include: [
              {
                model: Event,
                include: [{ model: User, include: [{ model: Wallet }] }],
              },
            ],
          },
        ],
        transaction: t,
      });
      if (orderTickets.length === 0) {
        return res
          .status(404)
          .json({ mesage: "orderTickets not found in order" });
      }
      let sellerEarnings = {};
      let totalPrice = 0;
      for (let orderTicket of orderTickets) {
        sellerEarnings[orderTicket.Ticket.Event.User.Wallet.id] =
          (parseFloat(
            sellerEarnings[orderTicket.Ticket.Event.User.Wallet.id]
          ) || 0) + parseFloat(orderTicket.subtotal_price);
        totalPrice += parseFloat(orderTicket.subtotal_price);
      }

      const currentBalance = await Wallet.findByPk(walletId, {
        transaction: t,
      });

      let currBalanceParsed = parseFloat(currentBalance.dataValues.balance);
      let newBalance = (currBalanceParsed - totalPrice).toFixed(2);

      let newBalanceParsed = parseFloat(newBalance);

      if (newBalanceParsed < 0) {
        await t.rollback();
        return res.status(400).json({
          message: "Insufficient funds",
        });
      }
      console.log("TOTAL PRICE : ", totalPrice);
      console.log("TOTAL PRICE : ", typeof totalPrice);

      let transaction = {
        wallet_id: walletId,
        amount: totalPrice,
        transaction_type: transactionType,
      };

      const walletTransanction = await WalletTransaction.create(transaction, {
        transaction: t,
      });
      await Wallet.increment(
        { balance: -totalPrice },
        {
          where: {
            id: walletId,
          },
          transaction: t,
        }
      );

      for (const [sellerWalletId, amount] of Object.entries(sellerEarnings)) {
        await WalletTransaction.create(
          {
            wallet_id: sellerWalletId,
            amount,
            transaction_type: "sell",
          },
          { transaction: t }
        );

        await Wallet.increment(
          { balance: amount },
          { where: { id: sellerWalletId }, transaction: t }
        );
      }

      const order = await Order.findOne({
        where: {
          id: orderId,
        },
      });
      if (!order) {
        return res.status(404).json({
          message: "order doesnt exist",
        });
      }
      if (order.status === "paid") {
        return res.status(400).json({
          message: "order already paid",
        });
      }
      await Payment.create({
        order_id: orderId,
        wallet_transaction_id: walletTransanction.id,
        method: "wallet",
        status: "paid",
        transaction: t,
      });
      order.status = "paid";
      await order.save();
      await db.sequelize.query(
        `UPDATE tickets
         INNER JOIN order_tickets ON tickets.id = order_tickets.ticket_id
         INNER JOIN orders ON order_tickets.order_id = orders.id
         SET tickets.quantity_available = tickets.quantity_available - order_tickets.quantity
         WHERE orders.id = :orderId`,
        {
          replacements: { orderId: orderId },
          type: db.Sequelize.QueryTypes.UPDATE,
        }
      );

      await t.commit();

      res.status(200).json(orderTickets);
    }
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      message: "Fail!",
      error: error.message,
    });
  }
};
