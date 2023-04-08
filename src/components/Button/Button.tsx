import React from 'react';
import { Button } from '@mui/material';
import { ButtonProp } from './Button.types';

export const ButtonMUI = ({ innerText, onClick }: ButtonProp) => {
  return (
    <Button variant="contained" onClick={onClick} size="large">
      {innerText}
    </Button>
  );
};
