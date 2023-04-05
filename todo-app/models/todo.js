"use strict";
const { Model, Op } = require("sequelize");
const db = {};
const hi = {};
const datee = new Date().toLocaleDateString("en-CA");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      // define association here
    }

    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }

    static getTodos() {
      return this.findAll();
    }

    static overdueTodos() {
      return this.findAll({
        where: {
          dueDate: {
            [Op.lt]: datee,
          },
        },
      });
    }

    static todayTodos() {
      return this.findAll({
        where: {
          dueDate: {
            [Op.eq]: datee,
          },
        },
      });
    }

    static laterTodos() {
      return this.findAll({
        where: {
          dueDate: {
            [Op.gt]: datee,
          },
        },
      });
    }

    markAsCompleted() {
      return this.update({ completed: true });
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      completed: DataTypes.BOOLEAN,
      dueDate: DataTypes.DATEONLY,
      
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
