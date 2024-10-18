'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tareas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ModuloEtapas, {foreignKey: 'moduloEtapaId'})
      this.belongsTo(models.Estados, {foreignKey: 'estadoId'})
    }
  };
  Tareas.init({
    nombre: DataTypes.STRING,
    moduloEtapaId: DataTypes.INTEGER,
    estadoId: DataTypes.INTEGER,
    usuarioIngresa: DataTypes.INTEGER,
    usuarioModifica: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tareas',
  });
  return Tareas;
};