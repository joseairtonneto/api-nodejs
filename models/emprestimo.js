'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Emprestimo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Emprestimo.init({
    livroId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    dataEmprestimo: DataTypes.DATE,
    dataDevolucao: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Emprestimo',
  });
  return Emprestimo;
};