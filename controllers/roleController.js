const { Op } = require("sequelize");
const { UserRole, Role } = require("../models");

const getUserByPk = require("../services/get-userby-pk-service");
const checkRoleExistence = require("../services/check-role-existence-service");

const roleController = {
  postRole: async (req, res) => {
    const userId = req.params.id;
    const { role } = req.body;
    try {
      const user = await getUserByPk.getUserByPk(userId);
      const exvalue = extract(user);
      if (exvalue === "User Not Found") {
        return res.status(200).json({ message: exvalue });
      }
      const roleAvail = await checkRoleExistence.isRoleExist(role);
      const ext = extract(roleAvail);

      if (ext === null) {
        return res.status(200).json({ message: "Role Not Found" });
      }

      const addRole = await UserRole.create({
        roleId: ext.id,
        userId: exvalue.id,
      });

      return res.status(200).json(addRole);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
  getRole: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await getUserByPk.getUserByPk(userId);
      const exvalue = extract(user);
      if (exvalue === "User Not Found") {
        return res.status(404).json({ message: exvalue });
      }
      const allRoles = await UserRole.findAll({
        where: {
          userId,
        },
      });

      const rolePromises = allRoles.map(async (role) => {
        const roleFind = await Role.findOne({
          where: {
            id: role.dataValues.roleId,
          },
        });
        return roleFind.dataValues.name;
      });

      const roles = await Promise.all(rolePromises);

      return res.status(200).json({ roles });
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  putRole: async (req, res) => {
    const userId = req.params.id;
    const removeRoles = req.body;
    try {
      const user = await getUserByPk.getUserByPk(userId);
      const exvalue = extract(user);
      if (exvalue === "User Not Found") {
        return res.status(404).json({ message: exvalue });
      }

      await Promise.all(
        removeRoles.map(async (remRole) => {
          const roleFind = await Role.findOne({
            where: {
              name: remRole,
            },
          });
          if (!roleFind) {
            return res
              .status(404)
              .json({ message: `Role '${remRole}' not found` });
          }
          await UserRole.destroy({
            where: {
              [Op.and]: [{ roleId: roleFind.id }, { userId }],
            },
          });
        })
      );

      return res.status(200).json({ message: "Roles removed successfully" });
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

const extract = (extract) => {
  const value = extract.matchWith({
    Ok: ({ value }) => value,
    Error: ({ value }) => {
      throw new Error(value);
    },
  });
  return value;
};

module.exports = roleController;
