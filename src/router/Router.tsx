import { Routes, Route } from 'react-router-dom';
import { PageTasks, PageChangeTask, PageCreateTask, PageNotFound } from 'pages/index';
import { PATH_LIST } from 'constants/index';

export const Router = () => {
  return (
    <Routes>
      <Route path={PATH_LIST.ROOT} element={<PageTasks />}></Route>
      <Route path={PATH_LIST.EDIT} element={<PageChangeTask />}></Route>
      <Route path={PATH_LIST.ADD} element={<PageCreateTask />}></Route>
      <Route path={PATH_LIST.NOT_FOUND} element={<PageNotFound />} />
    </Routes>
  );
};
