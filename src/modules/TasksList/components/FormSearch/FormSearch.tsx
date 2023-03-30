import React, { MouseEvent, useState } from 'react';
import { observer } from 'mobx-react';
import { Filter } from '../Filter';
import { TasksStoreInstance } from '../../store';
import { FilterValueType } from './FormSearch.types';

import { Button, SearchInput } from 'components/index';
import { FILTER_TYPES } from 'constants/index';

export const FormSearch = observer(() => {
  const { statusLoadingTasks, taskLoad } = TasksStoreInstance;

  const [searchValue, changeSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState<FilterValueType>(FILTER_TYPES.ALL);

  const handleResetSearch = () => {
    changeSearchValue('');
  };
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // console.log('search:' + searchValue.trim() + ' filter:' + filterValue);
    const SearchParams = {
      searchValue,
      filterValue,
    };
    await taskLoad(SearchParams);
  };
  return (
    <form className="search-form d-flex justify-content-between mt-2">
      <SearchInput
        value={searchValue}
        onChange={changeSearchValue}
        onReset={() => handleResetSearch()}
        disabled={statusLoadingTasks}
      />
      <Filter value={filterValue} onChange={setFilterValue} disabled={statusLoadingTasks} />
      <Button innerText="Find" onClick={(e) => handleSubmit(e)} disabled={statusLoadingTasks} />
    </form>
  );
});
