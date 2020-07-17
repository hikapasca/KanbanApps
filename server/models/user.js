'use strict';
const {hashPassword} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email:{type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    validate:{
      notNull:{
        args: true,
        msg: "Email cannot empty"
      },
      notEmpty:{
        args:true,
        msg: "Email cannot empty"
      }, 
      isEmail:{
        args: true,
        msg: "Wrong email format"
      },
      async checkEmail(value){
        const data = await User.findOne({where: {email: value}})
        if(data){
          throw new Error("This email has been registered")
        }
      }
    }},
    password:{type: DataTypes.STRING,
      allowNull: false,
    validate:{
      notNull:{
        args: true,
        msg: "Password cannot empty"
      },
      notEmpty:{
        args:true,
        msg: "Password cannot empty"
      }
    }},
    organization: {type: DataTypes.STRING} 
  }, {
    hooks:{
      beforeCreate: async (input, options) =>{
        const hash = hashPassword(input.password)
        input.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};