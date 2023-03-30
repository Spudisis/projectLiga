import React, { ChangeEvent, MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { ChangeStoreInstance } from './store';
import { Button, Checkbox, Loader, TextField } from 'components/index';

export const TaskChange = observer(() => {
  const {
    statusLoading,
    description,
    statusImportant,
    statusDone,
    taskName,
    getTask,
    changeTask,
    setTaskName,
    setDescription,
    setImportantStatus,
    setDoneStatus,
  } = ChangeStoreInstance;

  const params = useParams();

  const id = params.taskId;
  if (!id) {
    return <div>Нет айди</div>;
  }

  React.useEffect(() => {
    getTask(id);
  }, []);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    changeTask(id);
  };

  const handleChangeStatusDone = () => setDoneStatus(!statusDone);
  const handleChangeStatusImportant = () => setImportantStatus(!statusImportant);
  const changeTaskName = (e: ChangeEvent<HTMLInputElement>) => setTaskName(e.target.value);
  const changeDescription = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);

  return (
    <form>
      <TextField
        label={'Task name'}
        inputType={'text'}
        placeholder={'wish'}
        value={taskName}
        onChange={changeTaskName}
        disabled={statusLoading}
      />
      <TextField
        label={'Description'}
        inputType={'text'}
        placeholder={'Some'}
        value={description}
        onChange={changeDescription}
        disabled={statusLoading}
      />
      <Checkbox label={'is done'} checked={statusDone} onChange={handleChangeStatusDone} disabled={statusLoading} />
      <Checkbox
        label={'is important'}
        checked={statusImportant}
        onChange={handleChangeStatusImportant}
        disabled={statusDone || statusLoading}
      />
      <Loader isLoading={statusLoading}>
        <Button innerText="Change" onClick={handleSubmit} />
      </Loader>
    </form>
  );
});
