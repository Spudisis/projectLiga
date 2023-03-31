import { ChangeEventHandler, MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CreateStoreInstance } from './store/CreateStore';
import { taskCreateSchema } from './TaskCreate.validation';
import { CreateTaskValues } from './TaskCreate.types';
import { DefaultValuesAddTask } from './TaskCreate.constants';
import { Button, Checkbox, Loader, TextField } from 'components/index';
import { ROOT } from 'constants/index';

const TaskCreateProto = () => {
  const { statusLoading, createTask } = CreateStoreInstance;

  const { control, handleSubmit, setValue } = useForm<CreateTaskValues>({
    mode: 'all',
    defaultValues: DefaultValuesAddTask,
    resolver: yupResolver(taskCreateSchema),
  });
  const redirect = useNavigate();

  const onTaskNameChange: ChangeEventHandler<HTMLInputElement> = (e) => setValue('name', e.target.value);
  const onInfoChange: ChangeEventHandler<HTMLInputElement> = (e) => setValue('info', e.target.value);
  const onCheckboxChange: ChangeEventHandler<HTMLInputElement> = (e) => setValue('isImportant', e.target.checked);

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(async (form) => {
      const res = await createTask(form);
      //придумать что-то, чтобы отобразить ошибку при попытке редактирования
      if (res) {
        redirect(ROOT);
      } else {
        console.log('res is not ok');
      }
    })();
  };

  return (
    <form>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => (
          <TextField
            label={'Task name'}
            inputType={'text'}
            placeholder={'Delete'}
            value={field.value}
            onChange={onTaskNameChange}
            disabled={statusLoading}
            errorText={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="info"
        render={({ field, fieldState: { error } }) => (
          <TextField
            label={'Description'}
            inputType={'text'}
            placeholder={'Remove all repositories from github'}
            value={field.value}
            onChange={onInfoChange}
            disabled={statusLoading}
            errorText={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="isImportant"
        render={({ field }) => (
          <Checkbox label={'is important'} checked={field.value} onChange={onCheckboxChange} disabled={statusLoading} />
        )}
      />
      <Loader isLoading={statusLoading}>
        <Button innerText="Change" onClick={onSubmit} />
      </Loader>
    </form>
  );
};

export const TaskCreate = observer(TaskCreateProto);
