const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.RDS_DB_NAME, process.env.RDS_USER, process.env.RDS_PASSWORD, {
    host: process.env.RDS_HOST,
    dialect: 'mysql',
});

async function test() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.close()
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

test()