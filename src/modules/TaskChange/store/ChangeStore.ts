import { action, computed, makeObservable, observable } from 'mobx';
import { TaskChange, Task } from '../TaskChange.types';
import { Delay } from 'helpers/index';
import { DefaultValues } from 'constants/index';
import { TasksMock } from '__mocks__/index';

type PrivateFields = '_statusLoading' | '_task';

export class ChangeStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _statusLoading: observable,
      _task: observable,

      statusLoading: computed,
      task: computed,

      getTask: action,
      changeTask: action,
      changeTaskFields: action,
    });
  }
  private _statusLoading = false;
  private _task: TaskChange = DefaultValues;

  get statusLoading() {
    return this._statusLoading;
  }

  get task() {
    return this._task;
  }

  getTask = async (id: Task['id']) => {
    this._statusLoading = true;
    console.log(id);
    await Delay();
    this._task = TasksMock.find((elem) => elem.id === id)!;
    this._statusLoading = false;
  };

  changeTask = async (id: Task['id']) => {
    this._statusLoading = true;
    await Delay();
    console.log({ id, ...this._task });
    this._statusLoading = false;
  };
  changeTaskFields = (obj: Partial<TaskChange>) => {
    this._task = { ...this._task, ...obj };
  };
}
export const ChangeStoreInstance = new ChangeStore();
