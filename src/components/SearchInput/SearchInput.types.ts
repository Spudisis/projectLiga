import { MutableRefObject } from 'react';

/* eslint-disable no-unused-vars */
export interface SearchInputProps {
  onChange: (text: string) => void;
  value: string;
  disabled: boolean;
  refElem: MutableRefObject<HTMLInputElement | null>;
  onReset?: () => void;
}
