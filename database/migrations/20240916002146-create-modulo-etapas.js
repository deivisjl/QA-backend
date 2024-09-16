'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ModuloEtapas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      moduloId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Modulos',
          key: 'id'
        },
      },
      etapaId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Etapas',
          key: 'id'
        },
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
    await queryInterface.dropTable('ModuloEtapas');
  }
};