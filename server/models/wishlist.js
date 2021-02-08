'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wishlist.belongsTo(models.User)
    }
  };
  Wishlist.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nama wishlist harus diisi"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Gambar wishlist harus diisi"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 0,
          msg: "Minimal harga wishlist harus diatas angka 0"
        },
        customValidator(price) {
          if (price > models.User.saldo) {
            throw new Error("Harga wishlist tidak boleh melebihi saldo user");
          }
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Gambar wishlist harus diisi"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};
