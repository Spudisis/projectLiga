import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageTasks, PageChangeTask, PageCreateTask } from 'pages/index';
import { PATH_LIST } from 'constants/index';

export const Router = () => {
  return (
    <Routes>
      <Route path={PATH_LIST.ROOT} element={<PageTasks />}></Route>
      <Route path={PATH_LIST.EDIT} element={<PageChangeTask />}></Route>
      <Route path={PATH_LIST.ADD} element={<PageCreateTask />}></Route>
    </Routes>
  );
};
