import { TaskEntity } from 'domains/Task.entity';

export type PropsForm = {
  handleSubmit: (data: TaskEntity) => void;
  task: TaskEntity | undefined;
};
