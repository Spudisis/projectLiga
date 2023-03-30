import { TaskEntity } from 'domains/index';

export type Task = TaskEntity;
export type TaskChange = Omit<Task, 'id'>;
