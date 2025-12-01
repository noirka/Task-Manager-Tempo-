const { categories, getNextCategoryId } = require('../models/data');

const CategoryRepository = {
  findAll: () => categories,

  findByName: (name) =>
    categories.find((c) => c.name.toLowerCase() === name.toLowerCase()),

  create: (name) => {
    const newCategory = {
      id: getNextCategoryId(),
      name,
    };
    categories.push(newCategory);
    return newCategory;
  },
};

module.exports = CategoryRepository;
