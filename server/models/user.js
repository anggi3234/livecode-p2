'use strict';
const {
  Model
} = require('sequelize');
const {hashPass} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Wishlist)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid Email"
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: 5,
          msg: "Password should at least have more than 5 character"
        }
      }
    },
    saldo: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 0,
          msg: "Saldo tidak cukup untuk menampung wishlist"
        }
      },
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPass(user.password),
        user.saldo = 5000000
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
