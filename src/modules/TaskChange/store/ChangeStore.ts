import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { DefaultValues } from '../TaskChange.constants';
import { TaskChange as TaskChangeForm } from 'domains/index';

import { StatusLoading } from 'constants/StatusLoading';
import { TaskAgentInstance } from 'http/Agent';
import { mapToExternalChangeTask, mapToInternalOneTask } from 'helpers/index';
type PrivateFields = '_statusLoading' | '_task';

export class ChangeStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _statusLoading: observable,
      _task: observable,

      statusLoading: computed,
      task: computed,

      getTask: action.bound,
      changeTask: action.bound,
    });
  }
  private _statusLoading = StatusLoading.Loading;
  private _task: TaskChangeForm = DefaultValues;

  get statusLoading() {
    return this._statusLoading;
  }

  get task() {
    return this._task;
  }

  getTask = async (id: string) => {
    try {
      this._statusLoading = StatusLoading.Loading;

      const task = await TaskAgentInstance.getOneTask(id);
      const internalTask = mapToInternalOneTask(task);
      // throw new Error();
      runInAction(() => {
        this._task = internalTask;
        this._statusLoading = StatusLoading.Success;
      });
      return true;
    } catch {
      this._statusLoading = StatusLoading.Error;
      return false;
    }
  };

  changeTask = async (id: string, task: TaskChangeForm) => {
    try {
      this._statusLoading = StatusLoading.Loading;
      const externalSendData = mapToExternalChangeTask(task);
      await TaskAgentInstance.updateTask(id, externalSendData);

      this._statusLoading = StatusLoading.Success;
      return true;
    } catch {
      this._statusLoading = StatusLoading.Error;
      return false;
    }
  };
}
export const ChangeStoreInstance = new ChangeStore();
