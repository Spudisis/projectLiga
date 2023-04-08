import { Typography } from '@mui/material';
import { Link, PageContainer } from 'components/index';
import { PATH_LIST } from 'constants/index';

export const PageNotFound = () => {
  return (
    <PageContainer>
      <Typography paragraph>
        Page not Found <Link path={PATH_LIST.ROOT}>Return</Link>
      </Typography>
    </PageContainer>
  );
};
