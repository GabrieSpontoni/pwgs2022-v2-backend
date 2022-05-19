"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("tags", [
      {
        id: 1,
        tag: "azul",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        tag: "vermelho",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        tag: "verde",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        tag: "amarelo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        tag: "branco",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tags", null, {});
  },
};
