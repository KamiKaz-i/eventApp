import { DataTypes } from "sequelize";
export default (sequelize, Sequelize) => {
  const Order_ticket = sequelize.define(
    "Order_ticket",
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
      ticket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      subtotal_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    },
    {
      tableName: "order_tickets",
      timestamps: false,
    }
  );
  return Order_ticket;
};
