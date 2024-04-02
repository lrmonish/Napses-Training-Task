"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Image }) {
      Comment.belongsTo(Image, { foreignKey: "imageId" });
    }
  }
  Comment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      imageId: {
        type: DataTypes.UUID,
      },
      content: { type: DataTypes.TEXT },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
