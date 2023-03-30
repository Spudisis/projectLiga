import { action, computed, makeObservable, observable } from 'mobx';
import { TaskEntity } from 'domains/index';
import { Delay } from 'helpers/index';

type PrivateFields = '_statusLoading';

export class ChangeStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _statusLoading: observable,
      statusLoading: computed,
      changeTask: action,
    });
  }
  private _statusLoading = false;

  get statusLoading() {
    return this._statusLoading;
  }
  changeTask = async (params: TaskEntity) => {
    this._statusLoading = true;
    await Delay();
    console.log(params);
    this._statusLoading = false;
  };
}
export const ChangeStoreInstance = new ChangeStore();
