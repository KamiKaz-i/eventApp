import { DataTypes } from "sequelize";
export default (sequelize, Sequelize) => {
  const Payment = sequelize.define(
    "Payment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      wallet_transaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      method: {
        type: DataTypes.ENUM("wallet"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "paid", "canceled"),
        allowNull: false,
      },
    },
    {
      tablename: "payments",
      timestamps: true,
      updatedAt: false,
    }
  );
  return Payment;
};
