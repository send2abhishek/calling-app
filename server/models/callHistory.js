const { DataTypes } = require("sequelize");

const { sequelize } = require("../database/dbConnection");

const CallHistory = sequelize.define(
  "CallHistory",
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    callerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    callFrom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    callTo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    callDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    callRequestUuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  CallHistory,
};
