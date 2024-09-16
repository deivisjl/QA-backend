'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Etapas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Etapas.init({
    nombre: DataTypes.STRING,
    estado: DataTypes.STRING,
    usuarioIngresa: DataTypes.INTEGER,
    usuarioModifica: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Etapas',
  });
  return Etapas;
};