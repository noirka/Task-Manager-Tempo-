const request = require('supertest');
const { MongoClient } = require('mongodb');
const app = require('../app');
const { connectDB, getDB } = require('../config/db');
const initializeRoutes = require('../routes');
const {
  TaskService,
  MongoTaskRepository,
} = require('../../packages/task-service/dist/index');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/test_db_tasks';
const client = new MongoClient(uri);

const TEST_USER_ID = '654321098765432109876543';

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
    await db.collection('tasks_new_schema').deleteMany({});
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
      userId: TEST_USER_ID,
    };

    const postResponse = await request(configuredApp)
      .post('/api/v1/tasks')
      .set('X-User-Id', TEST_USER_ID)
      .send(taskData)
      .expect(201);

    expect(postResponse.body).toHaveProperty('_id');
    expect(postResponse.body.title).toBe(taskData.title);

    await request(configuredApp)
      .get('/api/v1/tasks')
      .set('X-User-Id', TEST_USER_ID)
      .expect(200)
      .then((getResponse) => {
        expect(getResponse.body).toBeInstanceOf(Array);
        expect(getResponse.body.length).toBe(1);
        expect(getResponse.body[0].title).toBe(taskData.title);
      });
  });

  it('PUT /api/v1/tasks/:id/complete should mark a task as completed', async () => {
    const initialData = {
      title: 'Task to complete',
      description: 'Integration test task',
      userId: TEST_USER_ID,
    };

    const createdTask = await taskService.createTask(initialData);
    const taskId = createdTask._id.toString();

    const putResponse = await request(configuredApp)
      .put(`/api/v1/tasks/${taskId}/complete`)
      .set('X-User-Id', TEST_USER_ID)
      .expect(200);

    if (putResponse.body.status) {
      expect(putResponse.body.status).toBe('done');
    }
    if (putResponse.body.isCompleted !== undefined) {
      expect(putResponse.body.isCompleted).toBe(true);
    }

    expect(putResponse.body._id).toBe(taskId);
  });

  it('PUT /api/v1/tasks/:id/complete should return 400 for invalid ObjectId format', async () => {
    await request(configuredApp)
      .put('/api/v1/tasks/invalid-id-format/complete')
      .set('X-User-Id', TEST_USER_ID)
      .expect(400);
  });

  it('PUT /api/v1/tasks/:id/complete should return 404 if task not found', async () => {
    const NON_EXISTENT_ID = '333333333333333333333333';
    await request(configuredApp)
      .put(`/api/v1/tasks/${NON_EXISTENT_ID}/complete`)
      .set('X-User-Id', TEST_USER_ID)
      .expect(404);
  });
});
