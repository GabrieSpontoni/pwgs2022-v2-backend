const { DataTypes } = require("sequelize");

const sequelize = require("../../src/database/instances/database");

const User = sequelize.define(
  "User",
  {
    displayName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },

    passwordHash: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "users",
  }
);

module.exports = User;
