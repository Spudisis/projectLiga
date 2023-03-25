import { MouseEvent } from 'react';
import { FiltersType } from 'domains/index';

export type FilterValueType = FiltersType;

export type ResetSearchProps = {
  changeSearchValue: (n: string) => void;
};

export type SubmitForm = {
  e: MouseEvent<HTMLButtonElement>;
  searchValue: string;
  filterValue: FilterValueType;
};
