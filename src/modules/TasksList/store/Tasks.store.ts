import { makeObservable, observable, computed, action } from 'mobx';
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
      formSearch: computed,

      taskLoad: action,
      changeImportantTask: action,
      changeCompleteTask: action,
      taskDelete: action,
    });
  }
  private _statusLoadingTasks = false;
  private _tasks: TaskEntity[] = [];
  private _tasksStats: TasksStatsEntity = {
    total: 0,
    important: 0,
    done: 0,
  };
  private _formSearch: SearchParams = {
    searchValue: '',
    filterValue: 'All',
  };

  get statusLoadingTasks() {
    return this._statusLoadingTasks;
  }

  get tasks() {
    return this._tasks;
  }

  get tasksStats() {
    return this._tasksStats;
  }

  get formSearch() {
    return this._formSearch;
  }

  taskLoad = async (params?: SearchParams) => {
    if (params) this._formSearch = params;

    console.log('params ' + this.formSearch.filterValue + ' ' + this.formSearch.searchValue);
    this._statusLoadingTasks = true;
    await Delay();
    this._tasks = TasksMock;
    this._tasksStats = TasksStatsMock;

    this._statusLoadingTasks = false;
  };

  changeImportantTask = async (id: TaskEntity['id'], statusImportant: TaskEntity['isImportant']) => {
    this._statusLoadingTasks = true;

    console.log('changeimportant', id, !statusImportant);
    this.taskLoad();
  };

  changeCompleteTask = async (id: TaskEntity['id'], statusComplete: TaskEntity['isDone']) => {
    this._statusLoadingTasks = true;
    console.log('changeIsDone', id, statusComplete);
    this.taskLoad();
  };

  taskDelete = async (id: TaskEntity['id']) => {
    this._statusLoadingTasks = true;

    console.log('delete', id);
    this.taskLoad();
  };
}

export const TasksStoreInstance = new Tasks();
