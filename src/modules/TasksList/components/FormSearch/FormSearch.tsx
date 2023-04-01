import { MouseEvent, useCallback } from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { Filter } from '../Filter';
import { TasksStoreInstance } from '../../store';
import { DefaultValuesSearch } from '../../TaskList.constants';
import { SearchParams } from 'domains/index';
import { StatusLoading } from 'constants/index';
import { Button, SearchInput } from 'components/index';

export const FormSearchProto = () => {
  const { statusLoadingTasks, taskLoad } = TasksStoreInstance;
  const { control, handleSubmit, setValue } = useForm<SearchParams>({
    defaultValues: DefaultValuesSearch,
  });

  const Loading = statusLoadingTasks === StatusLoading.Loading;

  const typeTaskChange = (tasksType: SearchParams['filterValue']) => setValue('filterValue', tasksType);
  const changeSearchInput = (searchText: SearchParams['searchValue']) => setValue('searchValue', searchText);
  const resetSearchInput = () => setValue('searchValue', '');

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(async (form) => {
      await taskLoad(form);
    })();
  };

  return (
    <form className="search-form d-flex justify-content-between mt-2">
      <Controller
        control={control}
        name="searchValue"
        render={({ field }) => (
          <SearchInput
            value={field.value}
            onChange={changeSearchInput}
            onReset={() => resetSearchInput()}
            disabled={Loading}
          />
        )}
      />
      <Controller
        control={control}
        name="filterValue"
        render={({ field }) => <Filter value={field.value} onChange={typeTaskChange} disabled={Loading} />}
      />
      <Button innerText="Find" onClick={onSubmit} disabled={Loading} />
    </form>
  );
};

export const FormSearch = observer(FormSearchProto);
