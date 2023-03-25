import { TaskEntity } from './Task.entity';

export type ValuesForm = Omit<TaskEntity, 'id'>;
