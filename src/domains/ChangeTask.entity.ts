import { TaskEntity } from 'domains/index';

export type TaskChange = Omit<TaskEntity, 'id'>;
