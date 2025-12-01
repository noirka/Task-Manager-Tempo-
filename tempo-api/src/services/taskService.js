const TaskRepository = require('../repositories/taskRepository');
const CategoryRepository = require('../repositories/categoryRepository');

const TaskService = {
  getAllTasks: (filter) => TaskRepository.findAll(filter),

  getTaskById: (id) => {
    const task = TaskRepository.findById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  },

  createTask: (data) => {
    if (!data.title) {
      throw new Error('Task title is required');
    }

    const categoryIds = [];
    if (data.categoryName) {
      let category = CategoryRepository.findByName(data.categoryName);
      if (!category) {
        category = CategoryRepository.create(data.categoryName);
      }
      categoryIds.push(category.id);
    }

    return TaskRepository.create(data, categoryIds);
  },

  updateTask: (id, data) => {
    const task = TaskRepository.findById(id);
    if (!task) {
      throw new Error('Task not found');
    }

    const updatedData = { ...data };
    delete updatedData.createdAt;

    return TaskRepository.update(id, updatedData);
  },

  markTaskComplete: (id) => {
    const task = TaskRepository.findById(id);
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
