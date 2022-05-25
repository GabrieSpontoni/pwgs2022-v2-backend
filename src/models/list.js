const { DataTypes } = require("sequelize");

const sequelize = require("../../src/database/instances/database");

const ListTask = require("./list_tasks");
const User = require("./user");

const List = sequelize.define(
  "List",
  {
    userId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    shared: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "lists",
  }
);

List.hasMany(ListTask, { foreignKey: "listId" });
List.belongsTo(User, { foreignKey: "userId" });

module.exports = List;
