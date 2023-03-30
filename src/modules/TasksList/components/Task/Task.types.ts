import { TaskEntity } from 'domains/Task.entity';
export type PropsEntityType = {
  elem: TaskEntity;
  deleteTask: (id: TaskEntity['id']) => Promise<void>;
  changeComplete: (id: TaskEntity['id'], statusComplete: TaskEntity['isDone']) => Promise<void>;
  changeImportant: (id: TaskEntity['id'], statusImportant: TaskEntity['isImportant']) => Promise<void>;
};

export type DeleteTaskProp = {
  setDeleteStatus: (b: boolean) => void;
};
