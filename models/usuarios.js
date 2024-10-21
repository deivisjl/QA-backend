'use strict';
const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Modulos, {foreignKey: 'usuarioId'})
      this.hasMany(models.UsuarioRoles, {foreignKey: 'usuarioId'})
    }
  };
  Usuarios.init({
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    token:DataTypes.STRING,
    estado: {
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  }, {
    sequelize,
    modelName: 'Usuarios',
    hooks:{
      beforeCreate:hashPassword,
      beforeUpdate:hashPassword
    }
  });
  return Usuarios;
};

const hashPassword = async(user) => {
  if(user.changed('password')){
    user.password = await bcrypt.hash(user.password, 10)
  }

  return user
}