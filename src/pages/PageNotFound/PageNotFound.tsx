import { Link } from 'react-router-dom';
import { PageContainer } from 'components/index';
import { PATH_LIST } from 'constants/index';

export const PageNotFound = () => {
  return (
    <PageContainer>
      <p className="h2">
        Page not Found <Link to={PATH_LIST.ROOT}>Return</Link>
      </p>
    </PageContainer>
  );
};
