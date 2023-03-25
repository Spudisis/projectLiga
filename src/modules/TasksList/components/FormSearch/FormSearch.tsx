import React, { useState } from 'react';
import { Filter } from '../Filter';

import { FilterValueType } from './FormSearch.types';
import { handleResetSearch, handleSubmit } from './FormSearch.helpers';
import { Button, SearchInput } from 'components/index';
import { FILTER_TYPES } from 'constants/index';

export const FormSearch = () => {
  const [searchValue, changeSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState<FilterValueType>(FILTER_TYPES.ALL);

  return (
    <form className="search-form d-flex justify-content-between mt-2">
      <SearchInput
        value={searchValue}
        onChange={changeSearchValue}
        onReset={() => handleResetSearch({ changeSearchValue })}
      />
      <Filter value={filterValue} onChange={setFilterValue} />
      <Button innerText="Find" onClick={(e) => handleSubmit({ e, searchValue, filterValue })} />
    </form>
  );
};
