import { MouseEvent } from 'react';

export type ButtonProp = {
  innerText: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};
