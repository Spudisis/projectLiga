import { object, string, boolean } from 'yup';
import { Validation } from 'constants/index';

export const taskChangeSchema = object().shape({
  name: string().required(Validation.Required),
  info: string().required(Validation.Required),
  isImportant: boolean(),
  isDone: boolean(),
});
