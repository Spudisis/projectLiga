import { TaskEntity } from 'domains/Task.entity';

export type PropsTask = {
  changeStatusImportant: () => void;
  changeStatusDone: () => void;
  elem: TaskEntity;
  setDeleteStatus: (b: boolean) => void;
  deleteStatus: boolean;
  handleDeleteTask: () => void;
};
