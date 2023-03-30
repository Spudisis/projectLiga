import React, { ChangeEvent, MouseEvent } from 'react';
import { observer } from 'mobx-react';

import { CreateStoreInstance } from './store/CreateStore';

import { Button, Checkbox, TextField } from 'components/index';
export const TaskCreate = observer(() => {
  const {
    statusLoading,
    createTask,
    setTaskName,
    setDescription,
    setImportantStatus,
    taskName,
    description,
    statusImportant,
  } = CreateStoreInstance;

  const handleChangeStatusImportant = () => setImportantStatus(!statusImportant);
  const changeTaskName = (name: ChangeEvent<HTMLInputElement>) => setTaskName(name.target.value);
  const changeDescription = (description: ChangeEvent<HTMLInputElement>) => setDescription(description.target.value);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await createTask();
    resetForm();
  };

  const resetForm = () => {
    setTaskName('');
    setDescription('');
    setImportantStatus(false);
  };

  return (
    <form>
      <TextField
        label={'Task name'}
        inputType={'text'}
        placeholder={'Delete'}
        value={taskName}
        onChange={changeTaskName}
        disabled={statusLoading}
      />
      <TextField
        label={'Description'}
        inputType={'text'}
        placeholder={'Remove all repositories from github'}
        value={description}
        onChange={changeDescription}
        disabled={statusLoading}
      />
      <Checkbox
        label={'is important'}
        checked={statusImportant}
        onChange={handleChangeStatusImportant}
        disabled={statusLoading}
      />
      <Button innerText="Create" onClick={handleSubmit} disabled={statusLoading} />
    </form>
  );
});
