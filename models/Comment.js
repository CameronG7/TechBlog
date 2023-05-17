const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true,
      
    }, 
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'user',
        key: 'id',

      }
    },
    
  },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
     
      modelName: 'comment',
    });

    module.exports = Comment;