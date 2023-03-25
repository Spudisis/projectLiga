import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from 'components/index';
import { TasksList } from 'modules/index';
import { PATH_LIST } from 'constants/pathsPages';
export const PageTasks = () => {
  return (
    <PageContainer>
      <h1>TODO list</h1>
      <Link to={PATH_LIST.ADD} className="btn btn-success container-fluid pt-2 pb-2">
        Добавить новый таск
      </Link>
      <TasksList />
    </PageContainer>
  );
};
