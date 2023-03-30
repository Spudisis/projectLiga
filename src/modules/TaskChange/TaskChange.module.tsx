import React, { ChangeEvent, MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { ChangeStoreInstance } from './store';
import { Button, Checkbox, Loader, TextField } from 'components/index';

export const TaskChange = observer(() => {
  const { statusLoading, task, getTask, changeTask, changeTaskFields } = ChangeStoreInstance;

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

  const handleChangeStatusDone = () => {
    changeTaskFields({ 'isDone': !task.isDone });

    if (task.isImportant) {
      changeTaskFields({ 'isImportant': false });
    }
  };

  const handleChangeStatusImportant = () => changeTaskFields({ 'isImportant': !task.isImportant });
  const changeTaskName = (e: ChangeEvent<HTMLInputElement>) => changeTaskFields({ 'name': e.target.value });
  const changeDescription = (e: ChangeEvent<HTMLInputElement>) => changeTaskFields({ 'info': e.target.value });

  return (
    <form>
      <TextField
        label={'Task name'}
        inputType={'text'}
        placeholder={'wish'}
        value={task.name}
        onChange={changeTaskName}
        disabled={statusLoading}
      />
      <TextField
        label={'Description'}
        inputType={'text'}
        placeholder={'Some'}
        value={task.info}
        onChange={changeDescription}
        disabled={statusLoading}
      />
      <Checkbox label={'is done'} checked={task.isDone} onChange={handleChangeStatusDone} disabled={statusLoading} />
      <Checkbox
        label={'is important'}
        checked={task.isImportant}
        onChange={handleChangeStatusImportant}
        disabled={task.isDone || statusLoading}
      />
      <Loader isLoading={statusLoading}>
        <Button innerText="Change" onClick={handleSubmit} />
      </Loader>
    </form>
  );
});
