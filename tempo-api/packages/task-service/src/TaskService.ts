import { ObjectId } from 'mongodb';
import { ITask, ITaskRepository, ITaskService, ITaskCreateData, ITaskUpdateData } from './interfaces'; 

export class TaskService implements ITaskService {
  private repository: ITaskRepository;

  constructor(repository: ITaskRepository) {
    this.repository = repository;
  }

  private toObjectId(id: string): ObjectId {
    if (!ObjectId.isValid(id)) {
        throw new Error(`Invalid ID format: ${id}`);
    }
    return new ObjectId(id);
  }

  public async createTask(taskData: ITaskCreateData): Promise<ITask> {
    if (!taskData.title || taskData.title.length < 5) {
      throw new Error("Task title is required and must be at least 5 characters long.");
    }
    
    const userIdString = taskData.userId;
    
    if (!userIdString) {
      throw new Error("User ID is missing."); 
    }

    const convertedUserId = this.toObjectId(userIdString);

    const dataToCreate: Omit<ITask, '_id' | 'createdAt' | 'updatedAt'> = {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        userId: convertedUserId 
    };

    const newTask = await this.repository.create(dataToCreate);
    return newTask;
  }

  public async getTaskById(taskId: string): Promise<ITask> {
    const id = this.toObjectId(taskId);
    const task = await this.repository.findById(id);

    if (!task) {
        throw new Error("Task not found"); 
    }
    
    return task;
  }

  public async getAllTasksByUserId(userId: string): Promise<ITask[]> {
    const id = this.toObjectId(userId);
    return this.repository.findAllByUserId(id);
  }

  public async updateTask(
    taskId: string, 
    updateData: ITaskUpdateData,
    userId: string // <<< ЗМІНА: Додано userId для авторизації
  ): Promise<ITask> {
    const id = this.toObjectId(taskId);
    const userIdObj = this.toObjectId(userId); // <<< ЗМІНА: Конвертуємо ID користувача
    
    // 1. ПЕРЕВІРКА АВТОРИЗАЦІЇ
    const currentTask = await this.getTaskById(taskId); 
    if (!currentTask.userId.equals(userIdObj)) { // <<< ЗМІНА: ПОРІВНЯННЯ ID
      throw new Error("Task not found or user not authorized."); 
    }
    
    // 2. БІЗНЕС-ЛОГІКА
    if (currentTask.status === 'done' && updateData.title) {
      throw new Error("Cannot change title of a completed task.");
    }

    // 3. ВИКЛИК РЕПОЗИТОРІЮ
    // Передаємо ID користувача до репозиторію, щоб він використав його у фільтрі MongoDB
    const updatedTask = await this.repository.update(id, updateData, userIdObj); // <<< ЗМІНА: Передаємо userIdObj
    
    if (!updatedTask) { 
        throw new Error("Task not found or update failed unexpectedly.");
    }
    
    return updatedTask;
  }

  public async deleteTask(taskId: string): Promise<boolean> {
    const id = this.toObjectId(taskId);
    
    const currentTask = await this.getTaskById(taskId); 
    
    if (currentTask.status === 'in-progress') {
      throw new Error("Cannot delete task while it is in progress.");
    }
    
    const deleted = await this.repository.delete(id);
    
    if (!deleted) {
        throw new Error("Task deletion failed unexpectedly.");
    }
    
    return deleted;
  }
}