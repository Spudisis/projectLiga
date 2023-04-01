import React from 'react';
import { observer } from 'mobx-react';
import { TasksStoreInstance } from '../../store';
import { StatusLoading } from 'constants/index';
import { Loader } from 'components/index';

const TaskStatsProto = () => {
  const { tasksStats, statusLoadingTasks } = TasksStoreInstance;
  const Loading = statusLoadingTasks === StatusLoading.Loading;
  return (
    <div className="d-flex w-100 justify-content-between mt-3">
      <p>
        Done:
        <Loader isLoading={Loading} variant="dot">
          <span className="badge bg-secondary">{tasksStats.done}</span>
        </Loader>
      </p>
      <p>
        Important:
        <Loader isLoading={Loading} variant="dot">
          <span className="badge bg-secondary">{tasksStats.important}</span>
        </Loader>
      </p>
      <p>
        Total:
        <Loader isLoading={Loading} variant="dot">
          <span className="badge bg-secondary">{tasksStats.total}</span>
        </Loader>
      </p>
    </div>
  );
};

export const TaskStats = observer(TaskStatsProto);
