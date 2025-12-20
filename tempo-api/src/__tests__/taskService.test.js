import { TaskService } from '@tempo-api/task-service/dist/index';

const TaskRepository = require('../repositories/taskRepository');

jest.mock('../repositories/taskRepository');

describe('TaskService Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully create a new task', async () => {
    const mockTask = {
      _id: 'mockId123',
      title: 'New Test Task',
      isCompleted: false,
    };
    TaskRepository.create.mockResolvedValue(mockTask);

    const taskData = {
      title: 'New Test Task',
      description: 'Test description',
    };

    const result = await TaskService.createTask(taskData);

    expect(TaskRepository.create).toHaveBeenCalledTimes(1);

    expect(result).toEqual(mockTask);
  });

  it('should throw an error if task title is missing', async () => {
    const taskData = {};

    await expect(TaskService.createTask(taskData)).rejects.toThrow(
      'Task title is required',
    );

    expect(TaskRepository.create).not.toHaveBeenCalled();
  });

  it('should retrieve a task by id', async () => {
    const mockTask = { _id: '123', title: 'Test Task' };
    TaskRepository.findById.mockResolvedValue(mockTask);

    const result = await TaskService.getTaskById('123');

    expect(TaskRepository.findById).toHaveBeenCalledWith('123');
    expect(result).toEqual(mockTask);
  });

  it('should throw an error if task not found by id', async () => {
    TaskRepository.findById.mockResolvedValue(null);

    await expect(TaskService.getTaskById('999')).rejects.toThrow(
      'Task not found',
    );
  });
});
