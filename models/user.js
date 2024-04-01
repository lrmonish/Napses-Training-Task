"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ AadharCardDetail, Address, Role, UserRole }) {
      User.belongsTo(AadharCardDetail, { foreignKey: "aadharId" });
      User.hasMany(Address, {
        foreignKey: "userId",
      });
      User.belongsToMany(Role, { through: UserRole, foreignKey:'userId' });
    }

    // toJSON() {
    //   return { ...this.get(), id: undefined };
    // }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      mobile: { type: DataTypes.STRING(20), allowNull: false, unique: true },
      aadharId: { type: DataTypes.UUID, defaultValue: null },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
