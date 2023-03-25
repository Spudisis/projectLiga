import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from 'components/PageContainer';
import { PATH_LIST } from 'constants/pathsPages';

export const PageNotFound = () => {
  return (
    <PageContainer>
      <p className="h2">
        Page not Found <Link to={PATH_LIST.ROOT}>Return</Link>
      </p>
    </PageContainer>
  );
};
