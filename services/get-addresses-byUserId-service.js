const { sequelize, User, Address } = require("../models");
const Result = require("folktale/result");

module.exports.getAddressByUserId = async (userId) => {
  return new Promise(async (resolve) => {
    const address = await Address.findAll({
      where: {
        userId,
      },
    })
      .then((addresses) => {
        resolve(Result.Ok(addresses));
      })
      .catch((err) => {
        resolve(Result.Ok("Addresses Not Found"));
      });
  });
};
