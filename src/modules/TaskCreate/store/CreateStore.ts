import { action, computed, makeObservable, observable } from 'mobx';
import { CreateTask } from 'domains/index';
import { Delay } from 'helpers/index';
import { StatusLoading } from 'constants/index';

type PrivateFields = '_statusLoading';

export class CreateStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _statusLoading: observable,

      statusLoading: computed,

      createTask: action.bound,
    });
  }
  private _statusLoading = StatusLoading.Success;

  get statusLoading() {
    return this._statusLoading;
  }

  createTask = async (fields: CreateTask) => {
    try {
      this._statusLoading = StatusLoading.Loading;
      //Запрос на сервер
      await Delay();
      console.log(fields);
      this._statusLoading = StatusLoading.Success;
      return true;
    } catch {
      this._statusLoading = StatusLoading.Error;
      return false;
    }
  };
}
export const CreateStoreInstance = new CreateStore();
