import { action, computed, makeObservable, observable } from 'mobx';
import { CreateTaskValues } from '../TaskCreate.types';

import { Delay } from 'helpers/index';

type PrivateFields = '_statusLoading';

export class CreateStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _statusLoading: observable,

      statusLoading: computed,

      createTask: action.bound,
    });
  }
  private _statusLoading = false;

  get statusLoading() {
    return this._statusLoading;
  }

  createTask = async (fields: CreateTaskValues) => {
    this._statusLoading = true;
    await Delay();
    console.log(fields);
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
export const CreateStoreInstance = new CreateStore();
