// @ts-nocheck
const request = require('supertest');
const app = require('../app');
const { getDB } = require('../config/db');

describe('TaskController Integration Tests', () => {
  let db;

  beforeAll(async () => {
    db = getDB();

    if (!db) {
      throw new Error(
        'Database not connected. Please run server or connectDB first.',
      );
    }
  });

  beforeEach(async () => {
    await db.collection('tasks').deleteMany({});
  });

  it('POST /api/v1/tasks should create a new task and GET should retrieve it', async () => {
    const taskData = {
      title: 'Buy groceries for the week',
      description: 'Milk, bread, eggs',
    };

    const postResponse = await request(app)
      .post('/api/v1/tasks')
      .send(taskData)
      .expect(201);

    expect(postResponse.body).toHaveProperty('_id');
    expect(postResponse.body.title).toBe(taskData.title);
    expect(postResponse.body.isCompleted).toBe(false);

    const taskId = postResponse.body._id;

    const getResponse = await request(app).get('/api/v1/tasks').expect(200);

    expect(getResponse.body.length).toBe(1);
    expect(getResponse.body[0]._id).toBe(taskId);
  });

  it('PUT /api/v1/tasks/:id/complete should mark a task as completed', async () => {
    const initialTask = { title: 'Task to complete', isCompleted: false };
    const createResult = await db.collection('tasks').insertOne(initialTask);
    const taskId = createResult.insertedId.toString();

    const putResponse = await request(app)
      .put(`/api/v1/tasks/${taskId}/complete`)
      .expect(200);

    expect(putResponse.body.isCompleted).toBe(true);
    expect(putResponse.body._id).toBe(taskId);

    const updatedTask = await db
      .collection('tasks')
      .findOne({ _id: createResult.insertedId });
    expect(updatedTask.isCompleted).toBe(true);
  });

  it('PUT /api/v1/tasks/:id/complete should return 400 for invalid ObjectId format', async () => {
    await request(app)
      .put('/api/v1/tasks/invalid-id-format/complete')
      .expect(400);
  });
});
