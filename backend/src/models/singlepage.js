/* eslint no-unused-vars: 0 */

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SinglePage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SinglePage.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    slug: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'SinglePage',
  });
  return SinglePage;
};
