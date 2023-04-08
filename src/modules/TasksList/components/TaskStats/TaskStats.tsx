import { observer } from 'mobx-react';
import { Stack } from '@mui/material';
import { TasksStoreInstance } from '../../store';
import { StyledSpan, StyledSkeleton } from './TaskStats.styles';
import { StatusLoading } from 'constants/index';

const TaskStatsProto = () => {
  const { tasksStats, statusLoadingTasks } = TasksStoreInstance;
  const Loading = statusLoadingTasks === StatusLoading.Loading;

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack component="p" direction="row" alignItems="center">
        Done:
        {Loading ? (
          <StyledSkeleton variant="rectangular" />
        ) : (
          <StyledSpan variant="caption">{tasksStats.done}</StyledSpan>
        )}
      </Stack>
      <Stack component="p" direction="row" alignItems="center">
        Important:
        {Loading ? (
          <StyledSkeleton variant="rectangular" />
        ) : (
          <StyledSpan variant="caption">{tasksStats.important}</StyledSpan>
        )}
      </Stack>
      <Stack component="p" direction="row" alignItems="center">
        Total:
        {Loading ? (
          <StyledSkeleton variant="rectangular" />
        ) : (
          <StyledSpan variant="caption">{tasksStats.total}</StyledSpan>
        )}
      </Stack>
    </Stack>
  );
};

export const TaskStats = observer(TaskStatsProto);
