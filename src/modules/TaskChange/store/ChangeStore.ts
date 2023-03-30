import { action, computed, makeObservable, observable } from 'mobx';
import { TaskChange } from '../TaskChange.types';
import { Delay } from 'helpers/index';
import { TaskEntity } from 'domains/index';
import { DefaultValues } from 'constants/index';
import { TasksMock } from '__mocks__/index';

type PrivateFields = '_statusLoading' | '_task';

export class ChangeStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _statusLoading: observable,
      _task: observable,

      statusLoading: computed,
      description: computed,
      statusImportant: computed,
      statusDone: computed,
      taskName: computed,

      getTask: action,
      changeTask: action,
      setTaskName: action,
      setDescription: action,
      setImportantStatus: action,
    });
  }
  private _statusLoading = false;
  private _task: Omit<TaskChange, 'id'> = DefaultValues;

  get statusLoading() {
    return this._statusLoading;
  }
  get taskName() {
    return this._task.name;
  }
  get description() {
    return this._task.info;
  }
  get statusImportant() {
    return this._task.isImportant;
  }
  get statusDone() {
    return this._task.isDone;
  }

  getTask = async (id: TaskChange['id']) => {
    this._statusLoading = true;
    console.log(id);
    await Delay();
    this._task = TasksMock.find((elem) => elem.id === id)!;
    this._statusLoading = false;
  };

  changeTask = async (id: TaskChange['id']) => {
    this._statusLoading = true;
    await Delay();
    console.log({ id, ...this._task });
    this._statusLoading = false;
  };

  setTaskName = (name: TaskChange['name']) => {
    this._task.name = name;
  };
  setDescription = (description: TaskChange['info']) => {
    this._task.info = description;
  };
  setImportantStatus = (status: TaskChange['isImportant']) => {
    this._task.isImportant = status;
  };
  setDoneStatus = (status: TaskChange['isDone']) => {
    this._task.isDone = status;
    if (this._task.isImportant) {
      this.setImportantStatus(false);
    }
  };
}
export const ChangeStoreInstance = new ChangeStore();
