import { action, computed, makeObservable, observable } from 'mobx';
import { DefaultValues } from '../TaskChange.constants';
import { TaskChange as TaskChangeForm } from 'domains/index';
import { Delay } from 'helpers/index';
import { TasksMock } from '__mocks__/index';
import { StatusLoading } from 'constants/StatusLoading';

type PrivateFields = '_statusLoading' | '_task' | '_id';

export class ChangeStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _statusLoading: observable,
      _task: observable,
      _id: observable,

      statusLoading: computed,
      task: computed,

      getTask: action.bound,
      changeTask: action.bound,
    });
  }
  private _statusLoading = StatusLoading.Loading;
  private _task: TaskChangeForm = DefaultValues;
  private _id = '';
  get statusLoading() {
    return this._statusLoading;
  }

  get task() {
    return this._task;
  }

  getTask = async (id: string) => {
    try {
      this._id = id;
      this._statusLoading = StatusLoading.Loading;

      await Delay();
      const task = TasksMock.find((elem) => elem.id === this._id);
      if (task) this._task = task;

      this._statusLoading = StatusLoading.Success;
      return true;
    } catch {
      this._statusLoading = StatusLoading.Error;
      return false;
    }
  };

  changeTask = async (task: TaskChangeForm) => {
    try {
      this._statusLoading = StatusLoading.Loading;
      await Delay();
      console.log({ id: this._id, ...task });

      this._statusLoading = StatusLoading.Success;
      return true;
    } catch {
      this._statusLoading = StatusLoading.Error;
      return false;
    }
  };
}
export const ChangeStoreInstance = new ChangeStore();
