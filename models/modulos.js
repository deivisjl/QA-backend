'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Modulos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Sistemas, {foreignKey: 'sistemaId'})
      this.belongsTo(models.Usuarios, {foreignKey: 'usuarioId'})
      this.belongsTo(models.Estados, {foreignKey: 'estadoId'})
      this.hasMany(models.ModuloEtapas, {foreignKey: 'moduloId'})
    }
  };
  Modulos.init({
    sistemaId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    estado: DataTypes.INTEGER,
    estadoId: DataTypes.INTEGER,
    usuarioIngresa: DataTypes.INTEGER,
    usuarioModifica: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Modulos',
  });
  return Modulos;
};