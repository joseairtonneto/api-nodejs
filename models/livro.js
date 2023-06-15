'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Livro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Livro.init({
    titulo: DataTypes.STRING,
    anopub: DataTypes.INTEGER,
    isbn: DataTypes.STRING,
    autorId: DataTypes.INTEGER,
    editoraId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Livro',
  });
  return Livro;
};