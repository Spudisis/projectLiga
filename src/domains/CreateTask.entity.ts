import { TaskEntity } from './Task.entity';
export type CreateTask = Omit<TaskEntity, 'id' | 'isDone'>;
