'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resenha extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Resenha.init({
    texto: DataTypes.STRING,
    nota: DataTypes.INTEGER,
    livroId: DataTypes.INTEGER,
    emprestimoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Resenha',
  });
  return Resenha;
};