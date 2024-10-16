'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ModuloEtapas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Modulos, {foreignKey: 'moduloId'})
      this.belongsTo(models.Etapas, {foreignKey: 'etapaId'})
      this.hasMany(models.Tareas, {foreignKey: 'moduloEtapaId'})
    }
  };
  ModuloEtapas.init({
    moduloId: DataTypes.INTEGER,
    etapaId: DataTypes.INTEGER,
    estado: DataTypes.INTEGER,
    usuarioIngresa: DataTypes.INTEGER,
    usuarioModifica: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ModuloEtapas',
  });
  return ModuloEtapas;
};