import { PageContainer } from 'components/index';
import { TaskCreate } from 'modules/index';

export const PageCreateTask = () => {
  return (
    <PageContainer>
      <h1>Create TASK</h1>
      <TaskCreate />
    </PageContainer>
  );
};
