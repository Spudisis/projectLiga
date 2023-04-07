import React, { ChangeEvent, ChangeEventHandler, MouseEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeStoreInstance } from './store';
import { taskChangeSchema } from './TaskChange.validation';

import { Button, Checkbox, ErrorMessage, Loader, TextField } from 'components/index';
import { ROOT, StatusLoading } from 'constants/index';
import { TaskChange as TaskChangeForm } from 'domains/ChangeTask.entity';

const TaskChangeProto = () => {
  const { statusLoading, task, getTask, changeTask } = ChangeStoreInstance;
  const params = useParams();
  const id = params.taskId;
  if (!id) {
    return <div>Нет айди</div>;
  }

  const Loading = statusLoading === StatusLoading.Loading;
  const Error = statusLoading === StatusLoading.Error;

  const { control, handleSubmit, setValue, reset, watch } = useForm<TaskChangeForm>({
    mode: 'all',
    defaultValues: task,
    resolver: yupResolver(taskChangeSchema),
  });
  const statusDone = watch('isDone');

  const [resGetTask, setResGetTask] = React.useState(true);
  const redirect = useNavigate();

  const checkGetTask = async () => {
    const res = await getTask(id);
    if (!res) setResGetTask(false);
  };
  React.useEffect(() => {
    checkGetTask();
  }, []);

  React.useEffect(() => {
    reset(task);
  }, [task]);

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(async (form) => {
      const res = await changeTask(id, form);
      if (res) {
        redirect(ROOT);
      }
    })();
  };
  const changeTaskName = (e: ChangeEvent<HTMLInputElement>) => setValue('name', e.target.value);
  const changeDescription = (e: ChangeEvent<HTMLInputElement>) => setValue('info', e.target.value);
  const handleChangeStatusImportant: ChangeEventHandler<HTMLInputElement> = (e) =>
    setValue('isImportant', e.target.checked);
  const handleChangeStatusDone: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue('isDone', e.target.checked);
    if (e.target.checked) {
      setValue('isImportant', false);
    }
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
            placeholder={'wish'}
            value={field.value}
            onChange={changeTaskName}
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
            placeholder={'Some'}
            value={field.value}
            onChange={changeDescription}
            disabled={Loading}
            errorText={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="isDone"
        render={({ field }) => (
          <Checkbox label={'is done'} checked={field.value} onChange={handleChangeStatusDone} disabled={Loading} />
        )}
      />
      <Controller
        control={control}
        name="isImportant"
        render={({ field }) => (
          <Checkbox
            label={'is important'}
            checked={field.value}
            onChange={handleChangeStatusImportant}
            disabled={statusDone || Loading}
          />
        )}
      />

      {resGetTask ? (
        <Loader isLoading={Loading}>
          <Button innerText="Change" onClick={onSubmit} />
        </Loader>
      ) : (
        <ErrorMessage>
          <span>
            Указанного ID не существует <Link to={ROOT}>Вернуться</Link>
          </span>
        </ErrorMessage>
      )}
      {Error && resGetTask && (
        <ErrorMessage>
          <span>Что-то пошло не так при изменении, попробуйте еще раз</span>
        </ErrorMessage>
      )}
    </form>
  );
};

export const TaskChange = observer(TaskChangeProto);
