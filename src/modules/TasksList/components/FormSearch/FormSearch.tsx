import React, { MouseEvent, useState } from 'react';
import { Filter } from '../Filter';

import { Button, SearchInput } from 'components/index';
import { FILTER_TYPES } from 'constants/index';
import { FiltersType } from 'domains/index';

export const FormSearch = () => {
  const [searchValue, changeSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState<FiltersType>(FILTER_TYPES.ALL);
  const handleResetSearch = () => {
    changeSearchValue('');
  };
  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('search:' + searchValue.trim() + ' filter:' + filterValue);
  };

  return (
    <form className="search-form d-flex justify-content-between mt-2">
      <SearchInput value={searchValue} onChange={changeSearchValue} onReset={handleResetSearch} />
      <Filter value={filterValue} onChange={setFilterValue} />
      <Button innerText="Find" onClick={handleSubmit} />
    </form>
  );
};
