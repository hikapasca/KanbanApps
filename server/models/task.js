"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "title cannot empty",
          },
          notEmpty: {
            args: true,
            msg: "title cannot empty",
          },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "category cannot empty",
          },
          notEmpty: {
            args: true,
            msg: "category cannot empty",
          },
          checkCategory(input) {
            const listTask = ["Backlog", "Todo", "Done", "Completed"];
            let counter = 0;
            for (let i = 0; i < listTask.length; i++) {
              if (input === listTask[i]) {
                counter += 1;
              }
            }
            if (counter === 0) {
              throw new Error(
                "Wrong format task! Task avalaible: Task, Todo, Done, Completed"
              );
            }
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "User Id cannot empty",
          },
          isNumeric: {
            args: true,
            msg: "Wrong User Id format",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
