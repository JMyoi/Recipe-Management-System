'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  recipe.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{// title has to be at least 3 characters long
        atLeastThree(value){
          if(value.length<3){
            throw new Error("Minimum of 3 characters required");
          }
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{//description has to be no more than 500 characters long
        max500(value){
          if(value.length>500){
            throw new Error("Maximum of 500 characters allowed");
          }
        }
      }
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{//ingredients has to be no more than 1000 characters long
        max1000(value){
          if(value.length>1000){
            throw new Error("maximum of 1000 characters allowed");
          }
        }
      }
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{//instructions has to be no more than 5000 characters long
        max5000(value){
          if(value.length>5000){
            throw new Error("maximum of 5000 characters allowed");
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'recipe',
    tableName: 'recipes',// explicit snake cased table name
    underscored: true // this option converts camelCased columns to snake_case in the DB
  });
  return recipe;
};