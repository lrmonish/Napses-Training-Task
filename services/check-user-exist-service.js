const { sequelize, User } = require("../models");
const Result = require("folktale/result");

module.exports.isUserExist = async (email) => {
  return new Promise(async (resolve) => {
    const user = await User.findOne({ where: { email } })
      .then((response) => {
        resolve(Result.Ok(response));
      })
      .catch((err) => {
        resolve(Result.Error({ error: "user Not Found" }));
      });
  });
};
