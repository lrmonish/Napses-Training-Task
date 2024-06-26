"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AadharCardDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      AadharCardDetail.hasOne(User, { foreignKey: "aadharId" });
    }
  }
  AadharCardDetail.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      aadharNumber: { type: DataTypes.STRING, unique: true },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AadharCardDetail",
    }
  );
  return AadharCardDetail;
};
