import React from 'react';
import { PageContainer } from 'components/PageContainer';
import { TaskChange } from 'modules/TaskChange';
export const PageChangeTask = () => {
  return (
    <PageContainer>
      <h1>Change TASK</h1>
      <TaskChange />
    </PageContainer>
  );
};
