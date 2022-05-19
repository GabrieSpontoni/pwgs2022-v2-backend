const { DataTypes } = require("sequelize");

const sequelize = require("../database/instances/database");

const Tag = sequelize.define(
  "Tag",
  {
    name: {
      type: DataTypes.STRING,
    },
    tag: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "tags",
  }
);

module.exports = Tag;
