const TaskService = require('../services/taskService');

const TaskController = {
  async getTasks(req, res) {
    try {
      const isCompleted = req.query.completed
        ? req.query.completed === 'true'
        : undefined;
      const tasks = await TaskService.getAllTasks({ isCompleted });
      return res.status(200).json(tasks);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal server error', error: error.message });
    }
  },

  async createTask(req, res) {
    try {
      if (!req.body.title) {
        return res
          .status(400)
          .json({ message: 'Title is required for a new task.' });
      }

      const newTask = await TaskService.createTask(req.body);
      return res.status(201).json(newTask);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async completeTask(req, res) {
    try {
      const { id } = req.params;
      const updatedTask = await TaskService.markTaskComplete(id);
      return res.status(200).json(updatedTask);
    } catch (error) {
      const status = error.message.includes('not found') ? 404 : 400;
      return res.status(status).json({ message: error.message });
    }
  },
};

module.exports = TaskController;
