import { DataTypes } from "sequelize";
export default (sequelize, Sequelize) => {
  const Order = sequelize.define(
    "Order",
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
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      status: {
        type: DataTypes.ENUM("pending", "paid", "canceled"),
        allowNull: false,
      },
    },
    {
      tablename: "orders",
      timestamps: true,
      updatedAt: false,
    }
  );
  return Order;
};
