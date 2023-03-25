import React from 'react';
import { PageContainer } from 'components/PageContainer';

import { TaskCreate } from 'modules/TaskCreate';

export const PageCreateTask = () => {
  return (
    <PageContainer>
      <h1>Create TASK</h1>
      <TaskCreate />
    </PageContainer>
  );
};
