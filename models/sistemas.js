'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sistemas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Proyectos, {foreignKey: 'proyectoId'})
      this.hasMany(models.Modulos, {foreignKey: 'sistemaId'})
    }
  };
  Sistemas.init({
    proyectoId: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    estado: DataTypes.INTEGER,
    usuarioIngresa: DataTypes.INTEGER,
    usuarioModifica: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sistemas',
  });
  return Sistemas;
};