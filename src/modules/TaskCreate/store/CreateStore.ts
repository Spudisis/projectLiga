import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { CreateTask } from 'domains/index';

import { StatusLoading } from 'constants/index';
import { TaskAgentInstance } from 'http/index';
import { mapToExternalAddTask } from 'helpers/index';
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
    this._statusLoading = StatusLoading.Loading;
    try {
      const externalAddTask = mapToExternalAddTask(fields);

      await TaskAgentInstance.createTask(externalAddTask);
      runInAction(() => {
        this._statusLoading = StatusLoading.Success;
      });
      return true;
    } catch {
      this._statusLoading = StatusLoading.Error;
      return false;
    }
  };
}
export const CreateStoreInstance = new CreateStore();
