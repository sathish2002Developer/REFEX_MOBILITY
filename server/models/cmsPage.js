"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CmsPage extends Model {
    static associate() {}
  }

  CmsPage.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      slug: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
      },
      page_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      meta_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      sections: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {},
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "CmsPage",
      tableName: "cms_pages",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return CmsPage;
};
