const { sequelize, User } = require("../models");
const Result = require("folktale/result");

module.exports.getUserByPk = async (userId) => {
  return new Promise(async (resolve) => {
    const user = await User.findByPk(userId)
      .then((response) => {
        resolve(Result.Ok(response));
      })
      .catch((err) => {
        resolve(Result.Ok("User Not Found"));
      });
  });
};
