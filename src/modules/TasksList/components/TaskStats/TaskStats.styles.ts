import styled from '@emotion/styled';
import { Typography, Skeleton } from '@mui/material';
export const StyledSpan = styled(Typography)({
  backgroundColor: 'gray',
  color: 'white',
  padding: '2px 10px',
  borderRadius: '5px',
});

export const StyledSkeleton = styled(Skeleton)({
  width: '30px',
  height: '24px',
  borderRadius: '5px',
});
