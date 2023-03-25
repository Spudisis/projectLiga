import React, { useState } from 'react';
import { Task } from './Task';

import { TaskEntity } from 'domains/Task.entity';

export const TaskHelper = (elem: TaskEntity) => {
  const [deleteStatus, setDeleteStatus] = useState(false);
  const changeStatusImportant = () => {
    console.log(elem.id, !elem.isImportant);
  };
  const changeStatusDone = () => {
    console.log(elem.id, !elem.isImportant);
  };

  const handleDeleteTask = () => {
    setDeleteStatus(false);
    console.log('delete');
  };

  return (
    <Task
      elem={elem}
      changeStatusImportant={changeStatusImportant}
      changeStatusDone={changeStatusDone}
      setDeleteStatus={setDeleteStatus}
      deleteStatus={deleteStatus}
      handleDeleteTask={handleDeleteTask}
    />
  );
};
