"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          id: "1d1c7267-4c33-42b4-b030-03c1803982ef", // Replace 'UUID1' with an actual UUID
          name: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "d789b2ac-8782-414d-bd82-a4e4b4df0f44", // Replace 'UUID2' with an actual UUID
          name: "User",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a3192a8e-dd56-4186-85ae-b1f36f99eca0", // Replace 'UUID2' with an actual UUID
          name: "SuperAdmin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more roles if needed
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
