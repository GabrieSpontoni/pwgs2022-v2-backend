const { DataTypes } = require("sequelize");

const sequelize = require("../database/instances/database");
const Tag = require("./tag");
const IsolatedTask = require("./isolated_task");

const IsolatedTaskTag = sequelize.define(
  "IsolatedTaskTag",
  {
    isolatedTaskId: {
      type: DataTypes.INTEGER,
      references: {
        model: "isolated_tasks",
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
    tableName: "isolated_tasks_tags",
  }
);

Tag.belongsToMany(IsolatedTask, {
  through: IsolatedTaskTag,
  foreignKey: "tagId",
});
IsolatedTask.belongsToMany(Tag, {
  through: IsolatedTaskTag,
  foreignKey: "isolatedTaskId",
});

module.exports = IsolatedTaskTag;
