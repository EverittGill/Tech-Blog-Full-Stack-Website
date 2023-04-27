const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class Article extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }

  Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    date_created: {
      type:DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
      },
    article_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        references: {
          model: 'user',
          key: 'id',
        },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'articles',
    });
  module.exports = Article;


  