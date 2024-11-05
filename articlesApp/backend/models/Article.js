const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('articles', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

class Article extends Model {
  static init(sequelize) {
    super.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        }
      },
    }, {
      sequelize,
      modelName: 'Article',
      tableName: 'articles'
    });
  }
}

module.exports = Article;
