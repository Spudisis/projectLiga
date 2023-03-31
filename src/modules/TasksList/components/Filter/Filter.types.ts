import { FiltersType } from 'domains/index';

export type PropFilter = {
  value: string;
  onChange: (value: FiltersType) => void;
  disabled: boolean;
};
