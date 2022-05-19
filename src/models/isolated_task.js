const { DataTypes } = require("sequelize");

const sequelize = require("../../src/database/instances/database");
const User = require("./user");

const IsolatedTask = sequelize.define(
  "IsolatedTask",
  {
    userId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    },
    tarefa: {
      type: DataTypes.STRING,
    },
    tempo_limite: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "isolated_tasks",
  }
);

IsolatedTask.belongsTo(User, { foreignKey: "userId" });

module.exports = IsolatedTask;
