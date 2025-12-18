/* eslint-disable consistent-return */
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('tempoDB');
    // eslint-disable-next-line no-console
    console.log('Successfully connected to MongoDB.');

    const tasksCollection = db.collection('tasks');

    await tasksCollection.createIndex({ _id: 1 });

    await tasksCollection.createIndex({ isCompleted: 1 });

    await tasksCollection.createIndex({ createdAt: -1 });

    // eslint-disable-next-line no-console
    console.log('MongoDB indexes initialized successfully for performance.');

    return db;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to MongoDB:', error);

    if (
      process.env.NODE_ENV !== 'test' &&
      process.env.NODE_ENV !== 'development'
    ) {
      process.exit(1);
    } else {
      throw error;
    }
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return db;
}

module.exports = { connectDB, getDB };
