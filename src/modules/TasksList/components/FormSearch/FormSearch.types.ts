import { FiltersType } from 'domains/index';

export type FormObserverType = {
  searchValue?: string | undefined;
  filterValue?: FiltersType | undefined;
};
