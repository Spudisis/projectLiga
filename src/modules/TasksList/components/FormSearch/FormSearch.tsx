import { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { Filter } from '../Filter';
import { TasksStoreInstance } from '../../store';
import { DefaultValuesSearch } from '../../TaskList.constants';
import { SearchParamsForm } from './FormSearch.types';
import { Button, SearchInput } from 'components/index';

export const FormSearchProto = () => {
  const { statusLoadingTasks, taskLoad } = TasksStoreInstance;
  const { control, handleSubmit, setValue } = useForm<SearchParamsForm>({
    defaultValues: DefaultValuesSearch,
  });

  const onTasksTypeChange = (tasksType: SearchParamsForm['filterValue']) => setValue('filterValue', tasksType);
  const onSearchInputChange = (searchText: SearchParamsForm['searchValue']) => setValue('searchValue', searchText);
  const onSearchInputReset = () => setValue('searchValue', '');

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
            onChange={onSearchInputChange}
            onReset={() => onSearchInputReset()}
            disabled={statusLoadingTasks}
          />
        )}
      />
      <Controller
        control={control}
        name="filterValue"
        render={({ field }) => (
          <Filter value={field.value} onChange={onTasksTypeChange} disabled={statusLoadingTasks} />
        )}
      />
      <Button innerText="Find" onClick={onSubmit} disabled={statusLoadingTasks} />
    </form>
  );
};

export const FormSearch = observer(FormSearchProto);
