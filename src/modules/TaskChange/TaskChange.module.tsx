import React, { ChangeEvent, ChangeEventHandler, MouseEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeStoreInstance } from './store';
import { TaskChangeForm } from './TaskChange.types';
import { taskChangeSchema } from './TaskChange.validation';
import { Button, Checkbox, Loader, TextField } from 'components/index';
import { ROOT } from 'constants/index';

const TaskChangeProto = () => {
  const { statusLoading, task, getTask, changeTask } = ChangeStoreInstance;
  const { control, handleSubmit, setValue, reset, watch } = useForm<TaskChangeForm>({
    mode: 'all',
    defaultValues: task,
    resolver: yupResolver(taskChangeSchema),
  });
  const statusDone = watch('isDone');
  const params = useParams();
  const id = params.taskId;
  const [resGetTask, setResGetTask] = React.useState(true);
  const redirect = useNavigate();

  if (!id) {
    return <div>Нет айди</div>;
  }

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
      const res = await changeTask(form);
      //придумать что-то, чтобы отобразить ошибку при попытке редактирования
      if (res) {
        redirect(ROOT);
      } else {
        console.log('res is not ok');
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
            placeholder={'Some'}
            value={field.value}
            onChange={changeDescription}
            disabled={statusLoading}
            errorText={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="isDone"
        render={({ field }) => (
          <Checkbox
            label={'is done'}
            checked={field.value}
            onChange={handleChangeStatusDone}
            disabled={statusLoading}
          />
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
            disabled={statusDone || statusLoading}
          />
        )}
      />

      {resGetTask ? (
        <Loader isLoading={statusLoading}>
          <Button innerText="Change" onClick={onSubmit} />
        </Loader>
      ) : (
        <div>
          Указанного ID не существует <Link to={ROOT}>Вернуться</Link>
        </div>
      )}
    </form>
  );
};

export const TaskChange = observer(TaskChangeProto);
