import { DataTypes } from "sequelize";

export default (sequelize, Sequelize) => {
  const Event = sequelize.define(
    "Event",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      organizer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      total_tickets: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      type: {
        type: DataTypes.ENUM(
          "Concert",
          "Gallery",
          "Theatre",
          "Cinema",
          "Other"
        ),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "events",
      timestamps: true,
      updatedAt: false,
    }
  );

  return Event;
};
