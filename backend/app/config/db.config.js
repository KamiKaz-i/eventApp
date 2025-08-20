import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: process.env.DIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

import userModel from "../models/user.model.js";
import eventModel from "../models/event.model.js";
import orderModel from "../models/order.model.js";
import order_ticketModel from "../models/order_ticket.model.js";
import paymentModel from "../models/payment.model.js";
import ticketModel from "../models/ticket.model.js";
import wallet_transactionModel from "../models/wallet_transaction.model.js";
import walletModel from "../models/wallet.model.js";
db.Event = eventModel(sequelize, Sequelize);
db.User = userModel(sequelize, Sequelize);
db.Order = orderModel(sequelize, Sequelize);
db.Order_ticket = order_ticketModel(sequelize, Sequelize);
db.Payment = paymentModel(sequelize, Sequelize);
db.Ticket = ticketModel(sequelize, Sequelize);
db.Wallet_transaction = wallet_transactionModel(sequelize, Sequelize);
db.Wallet = walletModel(sequelize, Sequelize);

db.User.hasMany(db.Event, { foreignKey: "organizer_id" });
db.Event.belongsTo(db.User, { foreignKey: "organizer_id" });

db.Ticket.belongsTo(db.Event, { foreignKey: "event_id" });
db.Event.hasOne(db.Ticket, { foreignKey: "event_id" });

db.Order.hasMany(db.Order_ticket, { foreignKey: "order_id" });
db.Order_ticket.belongsTo(db.Order, { foreignKey: "order_id" });

db.Ticket.hasMany(db.Order_ticket, { foreignKey: "ticket_id" });
db.Order_ticket.belongsTo(db.Ticket, { foreignKey: "ticket_id" });

db.User.hasOne(db.Wallet, { foreignKey: "user_id" });
db.Wallet.belongsTo(db.User, { foreignKey: "user_id" });
export default db;
