import { DataTypes } from "sequelize";
export default (sequelize, Sequelize) => {
  const Ticket = sequelize.define(
    "Ticket",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      quantity_available: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "tickets",
      timestamps: false,
    }
  );
  return Ticket;
};
