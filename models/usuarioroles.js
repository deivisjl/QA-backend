'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsuarioRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Usuarios, {foreignKey: 'usuarioId'})
      this.belongsTo(models.Roles, {foreignKey: 'rolId'})
    }
  };
  UsuarioRoles.init({
    usuarioId: DataTypes.INTEGER,
    rolId: DataTypes.INTEGER,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsuarioRoles',
  });
  return UsuarioRoles;
};