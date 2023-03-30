import { action, computed, makeObservable, observable } from 'mobx';
import { CreateTaskValues } from '../TaskCreate.types';
import { Delay } from 'helpers/index';

type PrivateFields = '_statusLoading';

export class CreateStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _statusLoading: observable,

      statusLoading: computed,

      createTask: action,
    });
  }
  private _statusLoading = false;

  get statusLoading() {
    return this._statusLoading;
  }
  createTask = async (data: CreateTaskValues) => {
    this._statusLoading = true;
    await Delay();
    console.log(data);
    this._statusLoading = false;
  };
}

export const CreateStoreInstance = new CreateStore();
