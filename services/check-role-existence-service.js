const { sequelize, Role } = require("../models");
const Result = require("folktale/result");

module.exports.isRoleExist = async (role) => {
  return new Promise(async (resolve) => {
    const roles = await Role.findOne({ where: { name: role } })
      .then((response) => {
        resolve(Result.Ok(response));
      })
      .catch((err) => {
        resolve(Result.Error({ error: "Role Not Found" }));
      });
  });
};
