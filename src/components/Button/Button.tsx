import React from 'react';
import { ButtonProp } from './Button.types';

export const Button = ({ innerText, onClick, disabled }: ButtonProp) => {
  return (
    <button className="btn btn-primary btn-lg" onClick={onClick} disabled={disabled}>
      {innerText}
    </button>
  );
};
