const app = require('./src/app');
const { connectDB } = require('./src/config/db');

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${PORT}`);
    // eslint-disable-next-line no-console
    console.log('API is connected to MongoDB!');
  });
}

startServer();
