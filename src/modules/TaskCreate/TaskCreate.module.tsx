import React, { ChangeEvent, MouseEvent } from 'react';
import { observer } from 'mobx-react';

import { CreateStoreInstance } from './store/CreateStore';

import { Button, Checkbox, TextField } from 'components/index';
export const TaskCreate = observer(() => {
  const { statusLoading, createTask, setFieldsForm, fieldsForm, resetForm } = CreateStoreInstance;

  const handleChangeStatusImportant = () => setFieldsForm({ 'isImportant': !fieldsForm.isImportant });
  const changeTaskName = (name: ChangeEvent<HTMLInputElement>) => setFieldsForm({ 'name': name.target.value });
  const changeDescription = (description: ChangeEvent<HTMLInputElement>) =>
    setFieldsForm({ 'info': description.target.value });

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await createTask();
    ResetSend();
  };

  const ResetSend = () => resetForm();
  return (
    <form>
      <TextField
        label={'Task name'}
        inputType={'text'}
        placeholder={'Delete'}
        value={fieldsForm.name}
        onChange={changeTaskName}
        disabled={statusLoading}
      />
      <TextField
        label={'Description'}
        inputType={'text'}
        placeholder={'Remove all repositories from github'}
        value={fieldsForm.info}
        onChange={changeDescription}
        disabled={statusLoading}
      />
      <Checkbox
        label={'is important'}
        checked={fieldsForm.isImportant}
        onChange={handleChangeStatusImportant}
        disabled={statusLoading}
      />
      <Button innerText="Create" onClick={handleSubmit} disabled={statusLoading} />
    </form>
  );
});
