/* eslint no-unused-vars: 0 */

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SocialNetwork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SocialNetwork.init({
    type: DataTypes.ENUM({
      values: ['instagram', 'facebook', 'x', 'youtube'],
    }),
    url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'SocialNetwork',
  });
  return SocialNetwork;
};
