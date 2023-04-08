import React from 'react';
import { TextFieldProps } from './TextField.types';

import { StyledTextField, StyledBox } from './TextField.styles';

export function TextField({
  label,
  disabled = false,
  placeholder,
  inputType,
  value,
  onChange,
  errorText,
}: TextFieldProps) {
  return (
    <StyledBox>
      <StyledTextField
        multiline
        error={errorText ? true : false}
        label={label}
        disabled={disabled}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        helperText={errorText}
      />
    </StyledBox>
  );
}
