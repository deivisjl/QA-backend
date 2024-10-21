'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PermisoRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Roles, {foreignKey: 'rolId'})
      this.belongsTo(models.Permisos, {foreignKey: 'permisoId'})
    }
  };
  PermisoRoles.init({
    permisoId: DataTypes.INTEGER,
    rolId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PermisoRoles',
  });
  return PermisoRoles;
};