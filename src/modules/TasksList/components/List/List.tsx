import React from 'react';

import { observer } from 'mobx-react';
import { Button, Grid } from '@mui/material';
import { Task } from '../Task';
import { TasksStoreInstance } from '../../store';

import { NotFoundTask } from '../NotFoundTask';
import { StyledSkeleton } from './List.styles';
import { StatusLoading } from 'constants/index';
import { ErrorMessage } from 'components/index';

const ListProto = () => {
  const { tasks, statusLoadingTasks, taskDelete, changeCompleteTask, changeImportantTask, taskLoad } =
    TasksStoreInstance;

  const Loading = statusLoadingTasks === StatusLoading.Loading;
  const Error = statusLoadingTasks === StatusLoading.Error;

  const emptyArray: unknown[] = [...Array(10)];

  const RepeatRequestTasks = () => {
    taskLoad();
  };

  return (
    <Grid container rowSpacing={1}>
      {Error && (
        <ErrorMessage>
          <span>Что-то пошло не так</span>
          <Button onClick={RepeatRequestTasks}>Попробовать ещё раз</Button>
        </ErrorMessage>
      )}
      {Loading ? (
        emptyArray.map((_, index) => <StyledSkeleton variant="rectangular" width={576} height={160} key={index} />)
      ) : tasks.length > 0 ? (
        tasks.map((elem) => (
          <Task
            elem={elem}
            deleteTask={taskDelete}
            changeComplete={changeCompleteTask}
            changeImportant={changeImportantTask}
            key={elem.id}
          />
        ))
      ) : (
        <NotFoundTask />
      )}
    </Grid>
  );
};

export const List = observer(ListProto);
