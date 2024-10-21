'use strict';
const {
  Model,
  INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permisos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.PermisoRoles, {foreignKey: 'permisoId'})
    }
  };
  Permisos.init({
    titulo: DataTypes.STRING,
    icono: DataTypes.STRING,
    ruta: DataTypes.STRING,
    visible: DataTypes.INTEGER,
    orden: DataTypes.INTEGER,
    padreId: DataTypes.INTEGER,
    estado:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Permisos',
  });
  return Permisos;
};