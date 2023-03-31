import { object, string, boolean } from 'yup';
import { Validation } from 'constants/index';

export const taskCreateSchema = object().shape({
  name: string().required(Validation.Required),
  info: string().required(Validation.Required),
  isImportant: boolean(),
});
