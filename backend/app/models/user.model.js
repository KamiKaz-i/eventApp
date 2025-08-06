import { DataTypes } from "sequelize";

export default (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isFirstLogin: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );
  return User;
};
