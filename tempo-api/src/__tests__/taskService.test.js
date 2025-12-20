const { TaskService } = require('@tempo-api/task-service/dist/index');

const TaskRepository = require('../repositories/taskRepository');

jest.mock('../repositories/taskRepository');

const VALID_MONGO_ID = '654321098765432109876543';

let taskServiceInstance;

describe('TaskService Unit Tests', () => {
  beforeAll(() => {
    taskServiceInstance = new TaskService(TaskRepository);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully create a new task', async () => {
    const mockTask = {
      _id: VALID_MONGO_ID,
      title: 'New Test Task',
      userId: VALID_MONGO_ID,
      isCompleted: false,
    };
    TaskRepository.create.mockResolvedValue(mockTask);

    const taskData = {
      title: 'New Test Task',
      description: 'Test description',
      userId: VALID_MONGO_ID,
    };

    const result = await taskServiceInstance.createTask(taskData);

    expect(TaskRepository.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockTask);
  });

  it('should throw an error if task title is missing', async () => {
    const taskData = { userId: VALID_MONGO_ID };

    await expect(taskServiceInstance.createTask(taskData)).rejects.toThrow(
      'Task title is required',
    );

    expect(TaskRepository.create).not.toHaveBeenCalled();
  });

  it('should retrieve a task by id', async () => {
    const mockTask = { _id: VALID_MONGO_ID, title: 'Test Task' };
    TaskRepository.findById.mockResolvedValue(mockTask);

    const result = await taskServiceInstance.getTaskById(VALID_MONGO_ID);

    expect(TaskRepository.findById).toHaveBeenCalledWith(VALID_MONGO_ID);
    expect(result).toEqual(mockTask);
  });

  it('should throw an error if task not found by id', async () => {
    TaskRepository.findById.mockResolvedValue(null);
    const NON_EXISTENT_ID = '333333333333333333333333';

    await expect(
      taskServiceInstance.getTaskById(NON_EXISTENT_ID),
    ).rejects.toThrow('Task not found');
  });

  it('should throw an error on invalid ID format', async () => {
    await expect(taskServiceInstance.getTaskById('123')).rejects.toThrow(
      'Invalid ID format: 123',
    );
  });
});
