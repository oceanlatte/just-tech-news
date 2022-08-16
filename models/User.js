const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create User model
class User extends Model {} 

// define table columns and confirguration
User.init(
  {
    // special Sequelize DataTypes object provide what type of data it is
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // password length, must be at least 4 characters
        len: [4]
      }
    }
  },
  {
    // Table configuration options
    sequelize,
    timestamps: false, // don't add timestamp attributes (updatedAt, createdAt)
    freezeTableName: true, // disable modification of table names
    underscored: true,
    modelName: 'user'
  }
);


module.exports = User;