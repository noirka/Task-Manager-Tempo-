/* eslint-disable no-underscore-dangle */
const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');

const TaskRepository = {
  findAll: async (filter = {}) => {
    const db = getDB();
    const collection = db.collection('tasks');

    const query = {};
    if (filter.isCompleted !== undefined) {
      query.isCompleted = filter.isCompleted;
    }

    return collection.find(query).toArray();
  },

  findById: async (id) => {
    const db = getDB();
    const collection = db.collection('tasks');

    try {
      return collection.findOne({ _id: new ObjectId(id) });
    } catch (e) {
      return null;
    }
  },

  create: async (taskData) => {
    const db = getDB();
    const collection = db.collection('tasks');

    const newTask = {
      title: taskData.title,
      description: taskData.description || null,
      isCompleted: false,
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newTask);

    return { ...newTask, _id: result.insertedId };
  },

  update: async (id, updateData) => {
    const db = getDB();
    const collection = db.collection('tasks');

    const updatedFields = { ...updateData, updatedAt: new Date() };

    delete updatedFields._id;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedFields },
    );

    if (result.matchedCount === 0) return null;

    return TaskRepository.findById(id);
  },

  delete: async (id) => {
    const db = getDB();
    const collection = db.collection('tasks');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return result.deletedCount > 0;
  },
};

module.exports = TaskRepository;
