import React from 'react';
import { PropTaskStats } from './TaskStats.types';

export const TaskStats = ({ TasksStatsMock }: PropTaskStats) => {
  return (
    <div className="d-flex w-100 justify-content-between mt-3">
      <p>
        Done:
        <span className="badge bg-secondary">{TasksStatsMock.done}</span>
      </p>
      <p>
        Important:
        <span className="badge bg-secondary">{TasksStatsMock.important}</span>
      </p>
      <p>
        Total:
        <span className="badge bg-secondary">{TasksStatsMock.total}</span>
      </p>
    </div>
  );
};
