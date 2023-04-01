import React from 'react';

import { observer } from 'mobx-react';
import { Task } from '../Task/index';
import { TasksStoreInstance } from '../../store';
import { ClassesContainer } from './List.constants';
import { StatusLoading } from 'constants/index';
import { Button, ErrorMessage, Loader } from 'components/index';

const ListProto = () => {
  const { tasks, statusLoadingTasks, taskDelete, changeCompleteTask, changeImportantTask, taskLoad } =
    TasksStoreInstance;

  const ClassContainer = statusLoadingTasks === StatusLoading.Loading ? ClassesContainer.flex : ClassesContainer.none;

  const Loading = statusLoadingTasks === StatusLoading.Loading;
  const Error = statusLoadingTasks === StatusLoading.Error;

  const RepeatRequestTasks = () => {
    taskLoad();
  };

  return (
    <div className={`container ${ClassContainer}`}>
      {Error && (
        <ErrorMessage>
          <span>Что-то пошло не так</span>
          <Button innerText="Получить таски" onClick={RepeatRequestTasks} />
        </ErrorMessage>
      )}
      <Loader isLoading={Loading}>
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
};

export const List = observer(ListProto);
