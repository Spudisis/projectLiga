import React from 'react';

import { observer } from 'mobx-react';
import { Task } from '../Task/index';
import { TasksStoreInstance } from '../../store';
import { Loader } from 'components/index';

export const List = observer(() => {
  const { tasks, statusLoadingTasks, taskDelete, changeCompleteTask, changeImportantTask } = TasksStoreInstance;
  return (
    <div className={`container ${statusLoadingTasks ? 'd-flex justify-content-center' : ''}`}>
      <Loader isLoading={statusLoadingTasks}>
        {tasks.length > 0
          ? tasks.map((elem) => (
              <Task
                elem={elem}
                deleteTask={taskDelete}
                changeComplete={changeCompleteTask}
                changeImportant={changeImportantTask}
                key={elem.id}
              />
            ))
          : 'Тасков нет'}
      </Loader>
    </div>
  );
});
