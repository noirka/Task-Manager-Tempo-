let taskIdCounter = 102;
let categoryIdCounter = 3;

const tasks = [
  {
    id: 100,
    title: 'Завершити ЛР №3',
    description: 'Імплементувати прототип з використанням статичних даних',
    isCompleted: false,
    dueDate: new Date('2025-11-05'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 101,
    title: 'Купити продукти',
    description: null,
    isCompleted: true,
    dueDate: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const categories = [
  { id: 1, name: 'Робота' },
  { id: 2, name: 'Особисте' },
];

let taskCategories = [
  { taskId: 100, categoryId: 1 },
  { taskId: 101, categoryId: 2 },
];

const getNextTaskId = () => {
  const id = taskIdCounter;
  taskIdCounter += 1;
  return id;
};

const getNextCategoryId = () => {
  const id = categoryIdCounter;
  categoryIdCounter += 1;
  return id;
};

const deleteTaskCategories = (taskId) => {
  taskCategories = taskCategories.filter((tc) => tc.taskId !== Number(taskId));
};

module.exports = {
  tasks,
  categories,
  taskCategories,
  getNextTaskId,
  getNextCategoryId,
  deleteTaskCategories,
};
