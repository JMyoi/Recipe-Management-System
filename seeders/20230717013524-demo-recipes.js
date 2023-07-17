'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('recipes', [{
      title:"chips",
      description:"NewJeans",
      ingredients:"53",
      instructions:"chipsssssssss",
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      title:"cookies",
      description:"NewJeans",
      ingredients:"5",
      instructions:"cokkieeeeeee",
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      title:"burgerrssssss",
      description:"NewJeans",
      ingredients:"54",
      instructions:"thingsssss",
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      title:"fruitssdfase",
      description:"NewJeans",
      ingredients:"34578",
      instructions:"juiccessssssss",
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('recipes', null, {});
  }
};
