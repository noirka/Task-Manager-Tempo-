import { Collection, ObjectId } from 'mongodb';

export interface ITask {
  _id?: ObjectId;
  title: string;
  description: string | null;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: Date;
  updatedAt: Date;
  userId: ObjectId; 
}

export interface ITaskCreateData {
  title: string;
  description: string | null;
  status: 'todo' | 'in-progress' | 'done';
  userId: string; 
}

export type ITaskUpdateData = Partial<Omit<ITask, '_id' | 'createdAt' | 'userId'>>;

export interface ITaskRepository {
  create(taskData: Omit<ITask, '_id' | 'createdAt' | 'updatedAt'>): Promise<ITask>;
  findById(taskId: ObjectId): Promise<ITask | null>;
  findAllByUserId(userId: ObjectId): Promise<ITask[]>; 
  update(taskId: ObjectId, updateData: Partial<Omit<ITask, '_id' | 'createdAt'>>): Promise<ITask | null>; 
  delete(taskId: ObjectId): Promise<boolean>;
}

export interface ITaskService {
  createTask(taskData: ITaskCreateData): Promise<ITask>;
  getTaskById(taskId: string): Promise<ITask>;
  getAllTasksByUserId(userId: string): Promise<ITask[]>;
  updateTask(taskId: string, updateData: ITaskUpdateData): Promise<ITask>;
  deleteTask(taskId: string): Promise<boolean>; 
}