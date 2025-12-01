const {
  tasks,
  taskCategories,
  getNextTaskId,
  deleteTaskCategories,
} = require('../models/data');

const TaskRepository = {
  findAll: (filter = {}) => {
    let filteredTasks = tasks;
    if (filter.isCompleted !== undefined) {
      filteredTasks = filteredTasks.filter(
        (t) => t.isCompleted === filter.isCompleted,
      );
    }
    return filteredTasks;
  },

  findById: (id) => tasks.find((t) => t.id === Number(id)),

  create: (taskData, categoryIds = []) => {
    const newTask = {
      id: getNextTaskId(),
      title: taskData.title,
      description: taskData.description || null,
      isCompleted: false,
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    tasks.push(newTask);

    categoryIds.forEach((catId) => {
      taskCategories.push({ taskId: newTask.id, categoryId: Number(catId) });
    });

    return newTask;
  },

  update: (id, updateData) => {
    const task = tasks.find((t) => t.id === Number(id));
    if (!task) return null;

    Object.assign(task, updateData, { updatedAt: new Date() });

    return task;
  },

  delete: (id) => {
    const index = tasks.findIndex((t) => t.id === Number(id));
    if (index === -1) return false;

    tasks.splice(index, 1);

    deleteTaskCategories(id);

    return true;
  },
};

module.exports = TaskRepository;
