const TaskRepository = require('../repositories/taskRepository');

const TaskService = {
  getAllTasks: async (filter) => TaskRepository.findAll(filter),

  getTaskById: async (id) => {
    const task = await TaskRepository.findById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  },

  createTask: async (data) => {
    if (!data.title) {
      throw new Error('Task title is required');
    }
    return TaskRepository.create(data);
  },

  updateTask: async (id, data) => {
    const task = await TaskRepository.findById(id);
    if (!task) {
      throw new Error('Task not found');
    }

    const updatedData = { ...data };
    delete updatedData.createdAt;

    return TaskRepository.update(id, updatedData);
  },

  markTaskComplete: async (id) => {
    const task = await TaskRepository.findById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    if (task.isCompleted) {
      throw new Error('Task is already completed');
    }
    return TaskRepository.update(id, { isCompleted: true });
  },
};

module.exports = TaskService;
