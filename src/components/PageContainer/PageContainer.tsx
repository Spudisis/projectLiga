import { PageContainerProps } from './PageContainer.types';
import { StyledContainer } from './PageContainer.styles';

export function PageContainer({ children }: PageContainerProps) {
  return (
    <StyledContainer direction="column" alignItems="stretch" justifyContent="center">
      {children}
    </StyledContainer>
  );
}
