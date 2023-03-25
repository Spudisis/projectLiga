import React, { MouseEvent, useState } from 'react';
import { CustomHook } from 'helpers/index';
import { DefaultValues } from 'constants/index';
import { Button, Checkbox, TextField } from 'components/index';
export const TaskCreate = () => {
  const TaskName = CustomHook(DefaultValues.name);
  const Description = CustomHook(DefaultValues.info);
  const [statusImportant, changeStatusImportant] = useState(DefaultValues.isImportant);

  const handleChangeStatusImportant = () => {
    changeStatusImportant(!statusImportant);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log({ name: TaskName.value, info: Description.value, isImportant: statusImportant, isDone: false });
    return null;
  };

  return (
    <form>
      <TextField label={'Task name'} inputType={'text'} placeholder={'Delete'} {...TaskName} />
      <TextField
        label={'Description'}
        inputType={'text'}
        placeholder={'Remove all repositories from github'}
        {...Description}
      />
      <Checkbox label={'is important'} checked={statusImportant} onChange={handleChangeStatusImportant} />
      <Button innerText="Change" onClick={handleSubmit} />
    </form>
  );
};
