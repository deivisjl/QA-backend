'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Tareas, {foreignKey: 'tareaId'})
      this.hasMany(models.Modulos, {foreignKey: 'moduloId'})
    }
  };
  Estados.init({
    nombre: DataTypes.STRING,
    color: DataTypes.STRING,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Estados',
  });
  return Estados;
};