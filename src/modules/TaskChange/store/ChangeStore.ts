import { action, computed, makeObservable, observable } from 'mobx';
import { TaskChangeForm } from '../TaskChange.types';
import { DefaultValues } from '../TaskChange.constants';
import { Delay } from 'helpers/index';
import { TasksMock } from '__mocks__/index';

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
  private _statusLoading = false;
  private _task: TaskChangeForm = DefaultValues;
  private _id = '';
  get statusLoading() {
    return this._statusLoading;
  }

  get task() {
    return this._task;
  }

  getTask = async (id: string) => {
    this._id = id;
    this._statusLoading = true;

    await Delay();
    const task = TasksMock.find((elem) => elem.id === this._id);
    this._statusLoading = false;

    if (task) {
      this._task = task;
      return true;
    } else {
      return false;
    }
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

  changeTask = async (task: TaskChangeForm) => {
    this._statusLoading = true;
    await Delay();
    console.log({ id: this._id, ...task });
    this._statusLoading = false;
    return true;
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
}
export const ChangeStoreInstance = new ChangeStore();
