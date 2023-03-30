import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { ChangeStoreInstance } from './store';
import { TasksMock } from '__mocks__/index';
import { Button, Checkbox, TextField } from 'components/index';
import { DefaultValues } from 'constants/index';

export const TaskChange = observer(() => {
  const { statusLoading, changeTask } = ChangeStoreInstance;

  const id = useParams();
  const task = TasksMock.find((elem) => elem.id === id.taskId);

  const [taskName, setTaskName] = React.useState(task ? task.name : DefaultValues.name);
  const [description, setDescription] = React.useState(task ? task.info : DefaultValues.info);
  const [statusDone, changeStatusDone] = useState(task ? task.isDone : DefaultValues.isDone);
  const [statusImportant, changeStatusImportant] = useState(task ? task.isImportant : DefaultValues.isImportant);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const idTask = id.taskId ? id.taskId : '0';
    const Object = {
      id: idTask,
      name: taskName,
      info: description,
      isImportant: statusImportant,
      isDone: statusDone,
    };

    changeTask(Object);
  };

  const handleChangeStatusDone = () => {
    changeStatusDone(!statusDone);
    changeStatusImportant(false);
  };
  const handleChangeStatusImportant = () => changeStatusImportant(!statusImportant);
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
      <Button innerText="Change" onClick={handleSubmit} disabled={statusLoading} />
    </form>
  );
});
