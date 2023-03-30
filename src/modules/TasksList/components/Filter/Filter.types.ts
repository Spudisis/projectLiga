import { FiltersType } from 'domains/index';

export type PropFilter = {
  value: FiltersType;
  onChange: (value: FiltersType) => void;
  disabled: boolean;
};
