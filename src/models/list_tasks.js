const { DataTypes } = require("sequelize");

const sequelize = require("../../src/database/instances/database");

const ListTask = sequelize.define(
  "ListTask",
  {
    listId: {
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
    tableName: "list_tasks",
  }
);

module.exports = ListTask;
