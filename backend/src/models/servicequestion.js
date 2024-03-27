const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ServiceQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Service, {
        foreignKey: 'id',
      });
    }
  }
  ServiceQuestion.init({
    serviceId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'ServiceQuestion',
  });
  return ServiceQuestion;
};
