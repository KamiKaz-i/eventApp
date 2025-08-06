import { DataTypes } from "sequelize";
export default (sequelize, Sequelize) => {
  const Wallet_transaction = sequelize.define(
    "Wallet_transaction",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      wallet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0.01,
        },
      },
      transaction_type: {
        type: DataTypes.ENUM("purchase", "deposit", "withdraw", "sell"),
        allowNull: false,
      },
    },
    {
      tablename: "wallet_transactions",
      timestamps: true,
      updatedAt: false,
    }
  );
  return Wallet_transaction;
};
