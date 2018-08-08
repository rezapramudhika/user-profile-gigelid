'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUnique: function (value, next) {
          let self = this;
          User.find({ where: { email: value } })
            .then(function (user) {
              // reject if a different user wants to use the same email
              if (user && self.id !== user.id) {
                return next('Email already in use!');
              }
              return next();
            })
            .catch(function (err) {
              return next(err);
            });
        }
      }
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUnique: function (value, next) {
          let self = this;
          User.find({ where: { contact: value } })
            .then(function (user) {
              if (user && self.id !== user.id) {
                return next('Phone number already in use!');
              }
              return next();
            })
            .catch(function (err) {
              return next(err);
            });
        }
      }
    },
    gender: DataTypes.STRING,
    birthofdate: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
  }, {});

  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};