const { User, Task } = require("../models");
class TaskController {
  static async add(req, res, next) {
    try {
      const newTask = {
        title: req.body.title,
        category: req.body.category,
        UserId: req.idUser,
      };
      const result = await Task.create(newTask);
      return res.status(201).json({ message: "Success add new task!" });
    } catch (err) {
      next(err);
    }
  }

  static async read(req, res, next) {
    try {
      const dataTask = await Task.findAll();
      return res.status(200).json(dataTask);
    } catch (err) {
      next(err);
    }
  }

  static async readById(req, res, next) {
    try {
      const param = req.params.id;
      console.log(param, "hehehe");
      const result = await Task.findOne({ where: { id: param } });

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const param = Number(req.params.id);
      const updateTask = {
        title: req.body.title,
        category: req.body.category,
        UserId: req.idUser,
      };

      const result = await Task.update(updateTask, {
        where: { id: param },
        returning: true,
      });
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const param = Number(req.params.id);
      const result = await Task.destroy({
        where: { id: param },
        returning: true,
      });
      return res.status(200).json({ message: "success delete task!" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TaskController;
