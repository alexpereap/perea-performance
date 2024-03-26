/* eslint no-unused-vars: 0 */

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Service.init({
    title: DataTypes.STRING,
    resume: DataTypes.TEXT,
    logo: DataTypes.STRING,
    explain: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};
