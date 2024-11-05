const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('articles', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

class Article extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
      },
      {
        sequelize,
        modelName: 'Article',
        tableName: 'articles',
        timestamps: false,
      }
    );
  }
}

Article.init(sequelize);

module.exports = Article;
