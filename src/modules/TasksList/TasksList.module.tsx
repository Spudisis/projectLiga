import React from 'react';
import { FormSearch, List, TaskStats } from './components/index';
import { TasksMock, TasksStatsMock } from '__mocks__/index';
export const TasksList = () => {
  return (
    <>
      <FormSearch />
      <TaskStats TasksStatsMock={TasksStatsMock} />
      <List TasksMock={TasksMock} />
    </>
  );
};
