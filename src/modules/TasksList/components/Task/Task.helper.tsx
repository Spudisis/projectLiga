import { ChangeStatusDone, ChangeStatusImportant, DeleteTaskProp } from './Task.types';

export const changeStatusImportant = ({ id, isImportant }: ChangeStatusImportant) => {
  console.log(id, !isImportant);
};
export const changeStatusDone = ({ id, isDone }: ChangeStatusDone) => {
  console.log(id, !isDone);
};

export const handleDeleteTask = ({ setDeleteStatus }: DeleteTaskProp) => {
  setDeleteStatus(false);
  console.log('delete');
};
