'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tareas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      etapaId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Etapas',
          key: 'id'
        },
      },
      estadoId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Estados',
          key: 'id'
        },
      },
      usuarioIngresa: {
        type: Sequelize.INTEGER
      },
      usuarioModifica: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tareas');
  }
};