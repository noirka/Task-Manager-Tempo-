const request = require('supertest');
const { MongoClient } = require('mongodb');
const app = require('../app');
const { connectDB, getDB } = require('../config/db');
const initializeRoutes = require('../routes');
const {
  TaskService,
  MongoTaskRepository,
} = require('../../packages/task-service/dist/index');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let configuredApp;
let db;
let tasksCollection;
let taskRepository;
let taskService;
let services;

describe('TaskController Integration Tests', () => {
  beforeAll(async () => {
    await connectDB();
    db = getDB();

    if (!db) {
      throw new Error('Failed to initialize database connection for tests.');
    }

    tasksCollection = db.collection('tasks_new_schema');
    taskRepository = new MongoTaskRepository(tasksCollection);
    taskService = new TaskService(taskRepository);
    services = { taskService };

    app.use('/api/v1', initializeRoutes(services));
    configuredApp = app;
  });

  beforeEach(async () => {
    await db.collection('tasks').deleteMany({});
  });

  afterAll(async () => {
    if (client) {
      await client.close();
    }
  });

  it('POST /api/v1/tasks should create a new task and GET should retrieve it', async () => {
    const taskData = {
      title: 'Buy groceries for the week',
      description: 'Milk, bread, eggs',
    };

    const postResponse = await request(configuredApp)
      .post('/api/v1/tasks')
      .send(taskData)
      .expect(201);

    expect(postResponse.body).toHaveProperty('_id');
    expect(postResponse.body.title).toBe(taskData.title);

    await request(configuredApp)
      .get('/api/v1/tasks')
      .expect(200)
      .then((getResponse) => {
        expect(getResponse.body.length).toBe(1);
        expect(getResponse.body[0].title).toBe(taskData.title);
      });
  });

  it('PUT /api/v1/tasks/:id/complete should mark a task as completed', async () => {
    const initialTask = {
      title: 'Task to complete',
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createResult = await db
      .collection('tasks_new_schema')
      .insertOne(initialTask);
    const taskId = createResult.insertedId.toString();

    const putResponse = await request(configuredApp)
      .put(`/api/v1/tasks/${taskId}/complete`)
      .expect(200);

    expect(putResponse.body.isCompleted).toBe(true);
  });

  it('PUT /api/v1/tasks/:id/complete should return 400 for invalid ObjectId format', async () => {
    await request(configuredApp)
      .put('/api/v1/tasks/invalid-id-format/complete')
      .expect(400);
  });
});
