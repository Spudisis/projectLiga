import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

export interface TextFieldProps {
  label: string;
  disabled?: boolean;
  placeholder?: string;
  inputType?: HTMLInputTypeAttribute;

  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  errorText?: string;
}
