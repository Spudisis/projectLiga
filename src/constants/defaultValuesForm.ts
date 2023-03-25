import { TaskEntity } from 'domains/Task.entity';

export const DefaultValues: Omit<TaskEntity, 'id'> = {
  name: '',
  info: '',
  isImportant: false,
  isDone: false,
};
