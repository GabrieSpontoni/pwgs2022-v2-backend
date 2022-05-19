"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("list_tasks_tags", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      listTaskId: {
        type: Sequelize.INTEGER,
        references: {
          model: "list_tasks",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: "tags",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("list_tasks_tags");
  },
};
