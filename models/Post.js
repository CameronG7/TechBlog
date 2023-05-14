const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true,
      
    },

    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'user',
        key: 'id',

      }
    }
  },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
     
      modelName: 'post',
    });

    module.exports = Post;