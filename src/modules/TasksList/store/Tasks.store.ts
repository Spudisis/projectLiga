import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { DefaultValuesSearch } from '../TaskList.constants';
import { SearchParams, TaskEntity, TasksStatsEntity } from 'domains/index';
import { TaskAgentInstance } from 'http/index';
import { StatusLoading } from 'constants/index';
import { getInternalInfo, mapToExternalParams, mapToInternalTasks } from 'helpers/index';

type FieldsPrivate = '_statusLoadingTasks' | '_tasks' | '_tasksStats' | '_formSearch';

export class Tasks {
  constructor() {
    makeObservable<this, FieldsPrivate>(this, {
      _statusLoadingTasks: observable,
      _tasks: observable,
      _tasksStats: observable,
      _formSearch: observable,

      tasks: computed,
      statusLoadingTasks: computed,
      tasksStats: computed,

      taskLoad: action.bound,
      changeImportantTask: action.bound,
      changeCompleteTask: action.bound,
      taskDelete: action.bound,
    });
  }
  private _statusLoadingTasks: StatusLoading = StatusLoading.Loading;
  private _tasks: TaskEntity[] = [];
  private _tasksStats: TasksStatsEntity = {
    total: 0,
    important: 0,
    done: 0,
  };
  private _formSearch: SearchParams = DefaultValuesSearch;

  get statusLoadingTasks() {
    return this._statusLoadingTasks;
  }

  get tasks() {
    return this._tasks;
  }

  get tasksStats() {
    return this._tasksStats;
  }
  getTasks = async (params?: SearchParams) => {
    const externalSearchParams = mapToExternalParams(params);
    const res = await TaskAgentInstance.getAllTasks(externalSearchParams);
    const tasksInternal = mapToInternalTasks(res);
    return {
      tasks: tasksInternal,
      tasksStats: getInternalInfo(tasksInternal),
    };
  };
  taskLoad = async (params?: SearchParams) => {
    if (params) this._formSearch = params;

    this._statusLoadingTasks = StatusLoading.Success;
    try {
      //Запрос на сервер
      this._statusLoadingTasks = StatusLoading.Loading;
      const { tasks, tasksStats } = await this.getTasks(this._formSearch);
      runInAction(() => {
        this._tasks = tasks;
        this._tasksStats = tasksStats;
        this._statusLoadingTasks = StatusLoading.Success;
      });
    } catch {
      this._statusLoadingTasks = StatusLoading.Error;
    }
  };

  changeImportantTask = async (id: TaskEntity['id'], statusImportant: TaskEntity['isImportant']) => {
    this._statusLoadingTasks = StatusLoading.Loading;

    try {
      await TaskAgentInstance.updateTask(id, {
        isImportant: !statusImportant,
      });
      const { tasks, tasksStats } = await this.getTasks(this._formSearch);
      runInAction(() => {
        this._tasks = tasks;
        this._tasksStats = tasksStats;
        this._statusLoadingTasks = StatusLoading.Success;
      });
    } catch {
      this._statusLoadingTasks = StatusLoading.Error;
    }
  };

  changeCompleteTask = async (id: TaskEntity['id'], statusComplete: TaskEntity['isDone']) => {
    this._statusLoadingTasks = StatusLoading.Loading;

    try {
      await TaskAgentInstance.updateTask(id, {
        isCompleted: !statusComplete,
        isImportant: statusComplete ? undefined : false,
      });
      const { tasks, tasksStats } = await this.getTasks(this._formSearch);
      runInAction(() => {
        this._tasks = tasks;
        this._tasksStats = tasksStats;
        this._statusLoadingTasks = StatusLoading.Success;
      });
    } catch {
      this._statusLoadingTasks = StatusLoading.Error;
    }
  };

  taskDelete = async (id: TaskEntity['id']) => {
    this._statusLoadingTasks = StatusLoading.Loading;

    try {
      await TaskAgentInstance.deleteTask(id);
      const { tasks, tasksStats } = await this.getTasks(this._formSearch);
      runInAction(() => {
        this._tasks = tasks;
        this._tasksStats = tasksStats;
        this._statusLoadingTasks = StatusLoading.Success;
      });
    } catch {
      this._statusLoadingTasks = StatusLoading.Error;
    }
  };
}

export const TasksStoreInstance = new Tasks();
