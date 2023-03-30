import { action, computed, makeObservable, observable } from 'mobx';
import { CreateTaskValues } from '../TaskCreate.types';
import { Delay } from 'helpers/index';
import { DefaultValues } from 'constants/index';

type PrivateFields = '_statusLoading' | '_taskName' | '_description' | '_statusImportant';

export class CreateStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _statusLoading: observable,
      _taskName: observable,
      _description: observable,
      _statusImportant: observable,

      statusLoading: computed,
      taskName: computed,
      description: computed,
      statusImportant: computed,

      createTask: action,
      setTaskName: action,
      setDescription: action,
      setImportantStatus: action,
    });
  }
  private _statusLoading = false;
  private _taskName = DefaultValues.name;
  private _description = DefaultValues.info;
  private _statusImportant = DefaultValues.isImportant;

  get statusLoading() {
    return this._statusLoading;
  }

  get taskName() {
    return this._taskName;
  }
  get description() {
    return this._description;
  }
  get statusImportant() {
    return this._statusImportant;
  }

  createTask = async () => {
    this._statusLoading = true;
    const data = {
      name: this._taskName,
      description: this._description,
      isImportant: this._statusImportant,
    };
    await Delay();
    console.log(data);
    this._statusLoading = false;
  };

  setTaskName = (name: CreateTaskValues['name']) => {
    this._taskName = name;
  };
  setDescription = (description: CreateTaskValues['info']) => {
    this._description = description;
  };
  setImportantStatus = (status: CreateTaskValues['isImportant']) => {
    this._statusImportant = status;
  };
}
export const CreateStoreInstance = new CreateStore();
