import { action, computed, makeObservable, observable } from 'mobx';
import { CreateTaskValues } from '../TaskCreate.types';
import { initialFields } from './CreateStore.constant';
import { Delay } from 'helpers/index';

type PrivateFields = '_statusLoading' | '_fieldsForm';

export class CreateStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _statusLoading: observable,
      _fieldsForm: observable,

      statusLoading: computed,
      fieldsForm: computed,

      createTask: action,
      setFieldsForm: action,
    });
  }
  private _statusLoading = false;

  private _fieldsForm: CreateTaskValues = initialFields;

  get statusLoading() {
    return this._statusLoading;
  }

  get fieldsForm() {
    return this._fieldsForm;
  }

  createTask = async () => {
    this._statusLoading = true;
    await Delay();
    console.log(this._fieldsForm);
    this._statusLoading = false;
  };

  setFieldsForm = (fields: Partial<CreateTaskValues>) => {
    this._fieldsForm = { ...this._fieldsForm, ...fields };
  };
  resetForm = () => {
    this._fieldsForm = initialFields;
  };
}
export const CreateStoreInstance = new CreateStore();
