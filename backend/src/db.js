const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize(
  process.env.RDS_DB_NAME,
  process.env.RDS_USER,
  process.env.RDS_PASSWORD,
  {
    host: process.env.RDS_HOST,
    dialect: 'mysql',
  },
);

module.exports = {
  Sequelize,
  sequelize,
  DataTypes,
  Model,
};
