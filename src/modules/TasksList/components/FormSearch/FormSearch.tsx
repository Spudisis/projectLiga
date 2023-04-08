import React, { useRef } from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import { Filter } from '../Filter';
import { TasksStoreInstance } from '../../store';
import { DefaultValuesSearch } from '../../TaskList.constants';
import { useDebouncedFunction } from './FormSearch.hooks';
import { SearchParams } from 'domains/index';
import { StatusLoading } from 'constants/index';
import { SearchInput } from 'components/index';

export const FormSearchProto = () => {
  const { statusLoadingTasks, taskLoad } = TasksStoreInstance;
  const { control, watch, setValue } = useForm<SearchParams>({
    defaultValues: DefaultValuesSearch,
  });
  const Loading = statusLoadingTasks === StatusLoading.Loading;

  const debouncedSearch = useDebouncedFunction(taskLoad, 300);

  React.useEffect(() => {
    const subscription = watch((value) => debouncedSearch(value));
    return () => subscription.unsubscribe();
  }, []);

  const refInput = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!Loading && refInput.current) refInput.current.focus();
  }, [Loading]);

  const typeTaskChange = (tasksType: SearchParams['filterValue']) => setValue('filterValue', tasksType);
  const changeSearchInput = (searchText: SearchParams['searchValue']) => setValue('searchValue', searchText);
  const resetSearchInput = () => setValue('searchValue', '');

  return (
    <Stack component="form" direction="row" justifyContent="space-between" mt={2} mb={2}>
      <Controller
        control={control}
        name="searchValue"
        render={({ field }) => (
          <SearchInput
            value={field.value}
            onChange={changeSearchInput}
            onReset={() => resetSearchInput()}
            disabled={Loading}
            refElem={refInput}
          />
        )}
      />
      <Controller
        control={control}
        name="filterValue"
        render={({ field }) => <Filter value={field.value} onChange={typeTaskChange} disabled={Loading} />}
      />
    </Stack>
  );
};

export const FormSearch = observer(FormSearchProto);
