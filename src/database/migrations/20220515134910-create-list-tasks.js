"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("list_tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      listId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "lists",
          key: "id",
        },
      },
      status: {
        type: Sequelize.STRING,
      },
      tarefa: {
        type: Sequelize.STRING,
      },
      tempo_limite: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("list_tasks");
  },
};
