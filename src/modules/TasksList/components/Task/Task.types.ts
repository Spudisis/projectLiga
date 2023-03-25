import { TaskEntity } from 'domains/Task.entity';
export type PropsEntityType = TaskEntity;

export type ChangeStatusDone = Pick<PropsEntityType, 'isDone' | 'id'>;
export type ChangeStatusImportant = Pick<PropsEntityType, 'isImportant' | 'id'>;
export type DeleteTaskProp = {
  setDeleteStatus: (b: boolean) => void;
};
