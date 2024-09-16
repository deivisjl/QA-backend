'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comentarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tareaId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Tareas',
          key: 'id'
        },
      },
      descripcion: {
        type: Sequelize.STRING
      },
      rutaArchivo: {
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
    await queryInterface.dropTable('Comentarios');
  }
};