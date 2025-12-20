import { Collection, ObjectId } from 'mongodb';
import { ITask, ITaskRepository } from './interfaces';

export class MongoTaskRepository implements ITaskRepository {
  private tasks: Collection<ITask>;

  constructor(tasksCollection: Collection<ITask>) {
    this.tasks = tasksCollection;
  }

  async create(taskData: Omit<ITask, '_id' | 'createdAt' | 'updatedAt'>): Promise<ITask> {
    const now = new Date();
    
    const taskToInsert: Omit<ITask, '_id'> = {
      ...(taskData as ITask),
      createdAt: now,
      updatedAt: now,
    };

    const result = await this.tasks.insertOne(taskToInsert as ITask);
    
    return { ...taskToInsert, _id: result.insertedId };
  }

  async findById(taskId: ObjectId): Promise<ITask | null> {
    const task = await this.tasks.findOne({ _id: taskId });
    return task;
  }

  async findAllByUserId(userId: ObjectId): Promise<ITask[]> { 
    const tasks = await this.tasks.find({ userId: userId }).toArray();
    return tasks;
  }

  async update(
    taskId: ObjectId, 
    updateData: Partial<Omit<ITask, '_id' | 'createdAt'>>,
    userId: ObjectId
  ): Promise<ITask | null> {
    
    const updatePayload = { 
        ...updateData, 
        updatedAt: new Date() 
    };
    
    const result = await this.tasks.findOneAndUpdate(
        { _id: taskId, userId: userId }, 
        { $set: updatePayload as Partial<ITask> },
        { returnDocument: 'after' } 
    );

    if (result && 'value' in result) {
        return (result.value as ITask | null) ?? null;
    }
    
    return null; 
  }

  async delete(taskId: ObjectId): Promise<boolean> {
    const result = await this.tasks.deleteOne({ _id: taskId });
    return result.deletedCount === 1;
  }
}