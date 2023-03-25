export const ROOT = '/';
export const EDIT = 'edit';
export const TASK_ID = 'taskId';
export const ADD = 'add';
export const NOT_FOUND = '*';
export const PATH_LIST = {
  ROOT,

  EDIT: `${ROOT}${EDIT}/:${TASK_ID}`,
  ADD: `${ROOT}${ADD}`,
  NOT_FOUND,
};
