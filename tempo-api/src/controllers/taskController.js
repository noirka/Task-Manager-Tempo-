/**
 * @param {object} taskService
 * @returns {object}
 */
module.exports = function taskControllerFactory(taskService) {
  const TaskController = {
    async getTasks(req, res) {
      try {
        const userId = req.headers['x-user-id'];

        if (!userId) {
          return res
            .status(401)
            .json({ message: 'Authorization header (X-User-Id) is missing.' });
        }

        const tasks = await taskService.getAllTasksByUserId(userId);
        return res.status(200).json(tasks);
      } catch (error) {
        console.error('GetTasks Error:', error);
        const status = error.message.includes('Invalid ID format') ? 400 : 500;
        return res
          .status(status)
          .json({ message: 'Internal server error', error: error.message });
      }
    },

    async createTask(req, res) {
      try {
        const userId = req.headers['x-user-id'];

        if (!userId) {
          return res
            .status(401)
            .json({ message: 'User ID is missing from headers.' });
        }

        const taskData = { ...req.body, userId };

        const newTask = await taskService.createTask(taskData);
        return res.status(201).json(newTask);
      } catch (error) {
        console.error('CreateTask Error:', error);
        return res.status(400).json({ message: error.message });
      }
    },

    async updateTask(req, res) {
      try {
        const { id } = req.params;
        const updateData = req.body;
        const userId = req.headers['x-user-id'];

        if (!userId) {
          return res.status(401).json({
            message: 'User ID is missing from headers for update operation.',
          });
        }

        const updatedTask = await taskService.updateTask(
          id,
          updateData,
          userId,
        );

        if (!updatedTask) {
          throw new Error('Task not found or user not authorized.');
        }

        return res.status(200).json(updatedTask);
      } catch (error) {
        console.error('UpdateTask Error:', error);
        const status =
          error.message.includes('not found') ||
          error.message.includes('not authorized')
            ? 404
            : 400;
        return res.status(status).json({ message: error.message });
      }
    },

    async deleteTask(req, res) {
      try {
        const { id } = req.params;
        const userId = req.headers['x-user-id'];

        if (!userId) {
          return res
            .status(401)
            .json({ message: 'User ID is missing from headers.' });
        }

        await taskService.deleteTask(id, userId);

        return res.status(204).send();
      } catch (error) {
        console.error('DeleteTask Error:', error);
        const status =
          error.message.includes('not found') ||
          error.message.includes('not authorized')
            ? 404
            : 400;
        return res.status(status).json({ message: error.message });
      }
    },

    async completeTask(req, res) {
      try {
        const { id } = req.params;
        const userId = req.headers['x-user-id'];

        if (!userId) {
          return res.status(401).json({
            message: 'User ID is missing from headers for complete operation.',
          });
        }

        const updatedTask = await taskService.updateTask(
          id,
          { status: 'done' },
          userId,
        );

        if (!updatedTask) {
          throw new Error('Task not found or user not authorized.');
        }

        return res.status(200).json(updatedTask);
      } catch (error) {
        console.error('CompleteTask Error:', error.message);

        let status;

        if (
          error.message.includes('not found') ||
          error.message.includes('not authorized')
        ) {
          status = 404;
        } else if (error.message.includes('Invalid ID format')) {
          status = 400;
        } else {
          status = 400;
        }

        return res.status(status).json({ message: error.message });
      }
    },
  };
  return TaskController;
};
