import { ResetSearchProps, SubmitForm } from './FormSearch.types';

export const handleResetSearch = ({ changeSearchValue }: ResetSearchProps) => {
  changeSearchValue('');
};
export const handleSubmit = ({ e, searchValue, filterValue }: SubmitForm) => {
  e.preventDefault();
  console.log('search:' + searchValue.trim() + ' filter:' + filterValue);
};
