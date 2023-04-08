import { ChangeEventHandler, MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CreateStoreInstance } from './store/CreateStore';
import { taskCreateSchema } from './TaskCreate.validation';
import { DefaultValuesAddTask } from './TaskCreate.constants';
import { CreateTask } from 'domains/index';
import { Checkbox, ErrorMessage, Loader, TextField, ButtonMUI } from 'components/index';
import { ROOT, StatusLoading } from 'constants/index';

const TaskCreateProto = () => {
  const { statusLoading, createTask } = CreateStoreInstance;
  const Loading = statusLoading === StatusLoading.Loading;
  const Error = statusLoading === StatusLoading.Error;

  const { control, handleSubmit, setValue } = useForm<CreateTask>({
    defaultValues: DefaultValuesAddTask,
    resolver: yupResolver(taskCreateSchema),
  });
  const redirect = useNavigate();

  const nameChange: ChangeEventHandler<HTMLInputElement> = (e) => setValue('name', e.target.value);
  const infoChange: ChangeEventHandler<HTMLInputElement> = (e) => setValue('info', e.target.value);
  const checkboxChange: ChangeEventHandler<HTMLInputElement> = (e) => setValue('isImportant', e.target.checked);

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(async (form) => {
      const res = await createTask(form);
      if (res) {
        redirect(ROOT);
      }
    })();
  };

  return (
    <>
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
              onChange={nameChange}
              disabled={Loading}
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
              onChange={infoChange}
              disabled={Loading}
              errorText={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="isImportant"
          render={({ field }) => (
            <Checkbox label={'is important'} checked={field.value} onChange={checkboxChange} disabled={Loading} />
          )}
        />
        <Loader isLoading={Loading}>
          <ButtonMUI innerText="Create" onClick={onSubmit} />
        </Loader>
        {Error && (
          <ErrorMessage>
            <span>Не удалось добавить, попробуйте еще раз</span>
          </ErrorMessage>
        )}
      </form>
    </>
  );
};

export const TaskCreate = observer(TaskCreateProto);
