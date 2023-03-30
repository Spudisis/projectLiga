import React from 'react';
import { FormSearch, List, TaskStats } from './components/index';
import { TasksStoreInstance } from './store';

export const TasksList = () => {
  React.useEffect(() => {
    TasksStoreInstance.taskLoad();
  }, []);
  return (
    <>
      <FormSearch />
      <TaskStats />
      <List />
    </>
  );
};
