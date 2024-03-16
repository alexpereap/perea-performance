'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'username', {
      unique: true,
      allowNull: false,
      type: Sequelize.STRING
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'username', {
      unique: false,
      allowNull: true,
      type: Sequelize.STRING
    })
  }
};
