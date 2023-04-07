import { FILTER_TYPES } from 'constants/index';
import { TaskEntity, SearchParams, TasksStatsEntity, CreateTask, TaskChange } from 'domains/index';
import {
  GetAllTasksQuery,
  GetAllTasksResponse,
  CreateTaskRequest,
  GetTaskResponse,
  UpdateTaskRequest,
} from 'http/index';

//internal для приложения
//external Для бэка

export const mapToExternalParams = (params?: SearchParams): GetAllTasksQuery | undefined => {
  if (!params) return undefined;

  const { searchValue, filterValue } = params;
  let isCompleted = undefined;

  if (filterValue === FILTER_TYPES.DONE) isCompleted = true;
  else if (filterValue === FILTER_TYPES.ACTIVE) isCompleted = false;

  return {
    name_like: searchValue ?? undefined,
    isImportant: filterValue === FILTER_TYPES.IMPORTANT ? true : undefined,
    isCompleted,
  };
};

export const mapToInternalTasks = (tasks: GetAllTasksResponse): TaskEntity[] => {
  const internalTasks: TaskEntity[] = [];

  tasks.forEach((task) => {
    if (task.id) {
      internalTasks.push({
        name: task.name || 'Неизвестно',
        id: String(task.id),
        info: task.info || 'Неизвестно',
        isImportant: task.isImportant || false,
        isDone: task.isCompleted || false,
      });
    }
  });

  return internalTasks;
};

export const mapToInternalOneTask = (task: GetTaskResponse): TaskEntity => {
  return {
    id: String(task.id),
    name: task.name || 'Неизвестно',
    info: task.info || 'Неизвестно',
    isImportant: task.isImportant || false,
    isDone: task.isCompleted || false,
  };
};

export const mapToExternalAddTask = (task: CreateTask): CreateTaskRequest => {
  return {
    name: task.name,
    isImportant: task.isImportant,
    info: task.info,
  };
};

export const mapToExternalChangeTask = (task: TaskChange): UpdateTaskRequest => {
  return {
    name: task.name,
    isImportant: task.isImportant,
    isCompleted: task.isDone,
    info: task.info,
  };
};

export const getInternalInfo = (tasks: TaskEntity[]): TasksStatsEntity => {
  const total = tasks.length;
  const anotherStats = tasks.reduce(
    (acc, task) => {
      return {
        important: task.isImportant ? acc.important + 1 : acc.important,
        done: task.isDone ? acc.done + 1 : acc.done,
      };
    },
    {
      important: 0,
      done: 0,
    }
  );

  return {
    total,
    ...anotherStats,
  };
};
