'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Modulos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sistemaId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Sistemas',
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
      usuarioId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Usuarios',
          key: 'id'
        },
      },
      nombre: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Modulos');
  }
};