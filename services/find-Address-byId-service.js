const { sequelize, User, Address } = require("../models");
const Result = require("folktale/result");

module.exports.findAddressById = async (addressId) => {
  return new Promise(async (resolve) => {
    const address = await Address.findOne({
      where: {
        id: addressId,
      },
    })
      .then((addresses) => {
        resolve(Result.Ok(addresses));
      })
      .catch((err) => {
        resolve(Result.Ok("Address Not Found"));
      });
  });
};
