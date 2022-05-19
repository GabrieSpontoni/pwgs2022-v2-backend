const { DataTypes } = require("sequelize");

const sequelize = require("../database/instances/database");
const Tag = require("./tag");
const ListTasks = require("./list_tasks");

const ListTaskTag = sequelize.define(
  "ListTaskTag",
  {
    listTaskId: {
      type: DataTypes.INTEGER,
      references: {
        model: "list_tasks",
        key: "id",
      },
    },
    tagId: {
      type: DataTypes.STRING,
      references: {
        model: "tags",
        key: "id",
      },
    },
  },
  {
    tableName: "list_tasks_tags",
  }
);

Tag.belongsToMany(ListTasks, {
  through: ListTaskTag,
  foreignKey: "tagId",
});
ListTasks.belongsToMany(Tag, {
  through: ListTaskTag,
  foreignKey: "listTaskId",
});

module.exports = ListTaskTag;
