import { Button } from '@mui/material';
import { Link, PageContainer } from 'components/index';
import { TasksList } from 'modules/index';
import { PATH_LIST } from 'constants/index';
export const PageTasks = () => {
  return (
    <PageContainer>
      <h1>TODO list</h1>
      <Button variant="outlined" color="success">
        <Link path={PATH_LIST.ADD}>Добавить новый таск</Link>
      </Button>
      <TasksList />
    </PageContainer>
  );
};
