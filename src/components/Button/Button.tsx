import React from 'react';
import { ButtonProp } from './Button.types';

export const Button = ({ innerText, onClick }: ButtonProp) => {
  return (
    <button className="btn btn-primary btn-lg" onClick={(e) => onClick(e)}>
      {innerText}
    </button>
  );
};
