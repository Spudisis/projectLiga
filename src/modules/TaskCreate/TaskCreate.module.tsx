import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { observer } from 'mobx-react';

import { CreateStoreInstance } from './store/CreateStore';

import { DefaultValues } from 'constants/index';
import { Button, Checkbox, TextField } from 'components/index';
export const TaskCreate = observer(() => {
  const { statusLoading, createTask } = CreateStoreInstance;

  const [taskName, setTaskName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [statusImportant, changeStatusImportant] = useState(DefaultValues.isImportant);

  const handleChangeStatusImportant = () => changeStatusImportant(!statusImportant);
  const changeTaskName = (name: ChangeEvent<HTMLInputElement>) => setTaskName(name.target.value);
  const changeDescription = (description: ChangeEvent<HTMLInputElement>) => setDescription(description.target.value);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const obj = { name: taskName, info: description, isImportant: statusImportant };
    await createTask(obj);
    resetForm();
  };

  const resetForm = () => {
    setTaskName('');
    setDescription('');
    changeStatusImportant(false);
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
