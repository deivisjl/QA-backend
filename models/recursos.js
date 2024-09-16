'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recursos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Recursos.init({
    resultadoId: DataTypes.INTEGER,
    rutaArchivo: DataTypes.STRING,
    estado: DataTypes.INTEGER,
    usuarioIngresa: DataTypes.INTEGER,
    usuarioModifica: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Recursos',
  });
  return Recursos;
};