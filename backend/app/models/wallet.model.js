import { DataTypes } from "sequelize";
export default (sequelize, Sequelize) => {
  const Wallet = sequelize.define(
    "Wallet",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    },
    {
      tableName: "wallets",
      timestamps: true,
      createdAt: false,
    }
  );
  return Wallet;
};
