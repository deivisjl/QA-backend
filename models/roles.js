'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.UsuarioRoles, {foreignKey: 'rolId'})
      this.hasMany(models.PermisoRoles, {foreignKey: 'rolId'})
    }
  };
  Roles.init({
    nombre: DataTypes.STRING,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};