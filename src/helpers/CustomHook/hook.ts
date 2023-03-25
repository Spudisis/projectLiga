import React from 'react';
import { OutputHook } from './hook.types';

export const CustomHook = (initialValue: string): OutputHook => {
  const [value, setValue] = React.useState(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return { value, onChange };
};
