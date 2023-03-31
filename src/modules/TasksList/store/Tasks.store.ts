import { makeObservable, observable, computed, action } from 'mobx';
import { DefaultValuesSearch } from '../TaskList.constants';
import { SearchParams, TaskEntity, TasksStatsEntity } from 'domains/index';
import { TasksMock, TasksStatsMock } from '__mocks__/index';
import { Delay } from 'helpers/index';

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
  private _statusLoadingTasks = false;
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

  taskLoad = async (params?: SearchParams) => {
    if (params) this._formSearch = params;
    this._statusLoadingTasks = true;
    await Delay();
    console.log(params);
    this._tasks = TasksMock;
    this._tasksStats = TasksStatsMock;

    this._statusLoadingTasks = false;
    // try {
    //   //Запрос на сервер
    //   this._task = task;
    //return true;
    // } catch {
    //    return false;
    // } finally {
    //   this._statusLoading = false;
    // }
  };

  changeImportantTask = async (id: TaskEntity['id'], statusImportant: TaskEntity['isImportant']) => {
    this._statusLoadingTasks = true;

    console.log('changeimportant', id, !statusImportant);
    // try {
    //   //Запрос на сервер
    //   this._task = task;
    //return true;
    // } catch {
    //    return false;
    // } finally {
    //   this._statusLoading = false;
    // }
    this.taskLoad();
  };

  changeCompleteTask = async (id: TaskEntity['id'], statusComplete: TaskEntity['isDone']) => {
    this._statusLoadingTasks = true;
    console.log('changeIsDone', id, statusComplete);
    // try {
    //   //Запрос на сервер
    //   this._task = task;
    //return true;
    // } catch {
    //    return false;
    // } finally {
    //   this._statusLoading = false;
    // }
    this.taskLoad();
  };

  taskDelete = async (id: TaskEntity['id']) => {
    this._statusLoadingTasks = true;
    console.log('delete', id);
    // try {
    //   //Запрос на сервер
    //   this._task = task;
    //return true;
    // } catch {
    //    return false;
    // } finally {
    //   this._statusLoading = false;
    // }
    this.taskLoad();
  };
}

export const TasksStoreInstance = new Tasks();
