/* eslint no-unused-vars: 0 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('HomeSlides', 'order', {
      defaultValue: 0,
      type: Sequelize.INTEGER,
      after: 'legend',
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('HomeSlides', 'order');
  },
};
