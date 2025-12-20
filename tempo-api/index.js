const {
  TaskService,
  MongoTaskRepository,
} = require('./packages/task-service/dist/index');

const app = require('./src/app');
const { connectDB, getDB } = require('./src/config/db');
const initializeRoutes = require('./src/routes');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    const db = getDB();

    const tasksCollection = db.collection('tasks_new_schema');
    const taskRepository = new MongoTaskRepository(tasksCollection);

    const taskService = new TaskService(taskRepository);

    const services = { taskService };

    app.use('/api/v1', initializeRoutes(services));

    app.use((req, res) => {
      res.status(404).json({ message: 'Not Found' });
    });

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, _next) => {
      // eslint-disable-next-line no-console
      console.error(err.stack);
      res.status(500).json({
        message: 'Something went wrong!',
        error: err.message,
      });
    });

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on http://localhost:${PORT}`);
      // eslint-disable-next-line no-console
      console.log('API is connected to MongoDB!');
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
