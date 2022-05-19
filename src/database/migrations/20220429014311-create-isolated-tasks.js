"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("isolated_tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
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
    await queryInterface.dropTable("isolated_tasks");
  },
};
