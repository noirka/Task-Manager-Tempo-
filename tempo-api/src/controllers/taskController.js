/**
 * @param {object} taskService
 * @returns {object}
 */
module.exports = function taskControllerFactory(taskService) {
  const TaskController = {
    async getTasks(req, res) {
      try {
        const DUMMY_USER_ID = '60c72b2f9c1e18c0f4f4f4f4';

        const tasks = await taskService.getAllTasksByUserId(DUMMY_USER_ID);
        return res.status(200).json(tasks);
      } catch (error) {
        return res
          .status(500)
          .json({ message: 'Internal server error', error: error.message });
      }
    },

    async createTask(req, res) {
      try {
        const newTask = await taskService.createTask(req.body);
        return res.status(201).json(newTask);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    },

    async updateTask(req, res) {
      try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedTask = await taskService.updateTask(id, updateData);

        if (!updatedTask) {
          return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json(updatedTask);
      } catch (error) {
        const status = error.message.includes('not found') ? 404 : 400;
        return res.status(status).json({ message: error.message });
      }
    },

    async deleteTask(req, res) {
      try {
        const { id } = req.params;

        const deleted = await taskService.deleteTask(id);

        if (!deleted) {
          return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(204).send();
      } catch (error) {
        const status = error.message.includes('not found') ? 404 : 400;
        return res.status(status).json({ message: error.message });
      }
    },

    async completeTask(req, res) {
      try {
        const { id } = req.params;

        const updatedTask = await taskService.updateTask(id, {
          status: 'done',
        });

        if (!updatedTask) {
          return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json(updatedTask);
      } catch (error) {
        const status = error.message.includes('not found') ? 404 : 400;
        return res.status(status).json({ message: error.message });
      }
    },
  };

  return TaskController;
};
