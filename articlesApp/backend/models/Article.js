const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('articles', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

class Article extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Article',
      tableName: 'articles',
      timestamps: false,
    });
  }
}

Article.init(sequelize);

module.exports = Article;
