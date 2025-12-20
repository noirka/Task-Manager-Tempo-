import { ObjectId } from 'mongodb';
import { ITask, ITaskRepository, ITaskService, ITaskCreateData } from './interfaces'; 

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

  public async getTaskById(taskId: string): Promise<ITask | null> {
    const id = this.toObjectId(taskId);
    return this.repository.findById(id);
  }

  public async getAllTasksByUserId(userId: string): Promise<ITask[]> {
    const id = this.toObjectId(userId);
    return this.repository.findAllByUserId(id);
  }

  public async updateTask(
    taskId: string, 
    updateData: Partial<Omit<ITask, '_id' | 'createdAt' | 'userId'>>
  ): Promise<ITask | null> {
    const id = this.toObjectId(taskId);
    
    const currentTask = await this.repository.findById(id);
    if (currentTask && currentTask.status === 'done' && updateData.title) {
        throw new Error("Cannot change title of a completed task.");
    }

    return this.repository.update(id, updateData);
  }

  public async deleteTask(taskId: string): Promise<boolean> {
    const id = this.toObjectId(taskId);
    
    const currentTask = await this.repository.findById(id);
    if (currentTask && currentTask.status === 'in-progress') {
        throw new Error("Cannot delete task while it is in progress.");
    }
    
    return this.repository.delete(id);
  }
}