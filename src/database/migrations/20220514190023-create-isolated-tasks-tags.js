"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("isolated_tasks_tags", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      isolatedTaskId: {
        type: Sequelize.INTEGER,
        references: {
          model: "isolated_tasks",
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
    await queryInterface.dropTable("isolated_tasks_tags");
  },
};
