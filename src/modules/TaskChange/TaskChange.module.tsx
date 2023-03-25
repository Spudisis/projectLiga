import React, { MouseEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TaskEntity } from 'domains/index';
import { TasksMock } from '__mocks__/index';
import { Button, Checkbox, TextField } from 'components/index';
import { CustomHook } from 'helpers/index';
import { DefaultValues } from 'constants/index';

export const TaskChange = () => {
  const id = useParams();

  const task = TasksMock.find((elem) => elem.id === id.taskId);

  const TaskName = CustomHook(task ? task.name : DefaultValues.name);
  const Description = CustomHook(task ? task.info : DefaultValues.info);
  const [statusDone, changeStatusDone] = useState(task ? task.isDone : DefaultValues.isDone);
  const [statusImportant, changeStatusImportant] = useState(task ? task.isImportant : DefaultValues.isImportant);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>): TaskEntity => {
    e.preventDefault();
    const idTask = id.taskId ? id.taskId : '0';
    const Object = {
      id: idTask,
      name: TaskName.value,
      info: Description.value,
      isImportant: statusImportant,
      isDone: statusDone,
    };
    console.log(Object);
    return Object;
  };

  const handleChangeStatusDone = () => {
    changeStatusDone(!statusDone);
    changeStatusImportant(false);
  };
  const handleChangeStatusImportant = () => {
    changeStatusImportant(!statusImportant);
  };
  return (
    <form>
      <TextField label={'Task name'} inputType={'text'} placeholder={'wish'} {...TaskName} />
      <TextField label={'Description'} inputType={'text'} placeholder={'Some'} {...Description} />
      <Checkbox label={'is done'} checked={statusDone} onChange={handleChangeStatusDone} />
      <Checkbox
        label={'is important'}
        checked={statusImportant}
        onChange={handleChangeStatusImportant}
        disabled={statusDone}
      />
      <Button innerText="Change" onClick={handleSubmit} />
    </form>
  );
};
