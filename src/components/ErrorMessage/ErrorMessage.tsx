import { Alert, Box } from '@mui/material';
import { ErrorMessageProps } from './ErrorMessage.types';

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <Box mt={2} mb={2}>
      <Alert severity="error">{children}</Alert>
    </Box>
  );
};
