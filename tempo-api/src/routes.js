const express = require('express');
const taskControllerFactory = require('./controllers/taskController');

module.exports = function initializeApiRoutes({ taskService }) {
  const router = express.Router();

  const taskController = taskControllerFactory(taskService);

  router.get('/tasks', taskController.getTasks);
  router.post('/tasks', taskController.createTask);
  router.put('/tasks/:id/complete', taskController.completeTask);

  router.put('/tasks/:id', taskController.updateTask);
  router.delete('/tasks/:id', taskController.deleteTask);

  return router;
};
