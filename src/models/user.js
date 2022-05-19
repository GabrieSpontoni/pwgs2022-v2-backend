const { DataTypes } = require("sequelize");

const sequelize = require("../../src/database/instances/database");
// const IsolatedTask = require("./isolated_task");
// const List = require("./list");

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

// IsolatedTask.belongsTo(User, { foreignKey: "userId" });
// List.belongsTo(User, { foreignKey: "userId" });

module.exports = User;
