import React from 'react';
import { ErrorMessageProps } from './ErrorMessage.types';

export const ErrorMessage = ({ children, className }: ErrorMessageProps) => {
  return <div className={`text-danger ${className}`}>{children}</div>;
};
