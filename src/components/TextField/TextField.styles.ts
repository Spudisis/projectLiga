import styled from '@emotion/styled';
import { TextField, Box } from '@mui/material';

export const StyledTextField = styled(TextField)({
  fontSize: '20px',
});
export const StyledBox = styled(Box)({
  margin: '20px 0px',
  width: '100%',
  ['div']: {
    width: 'inherit',
  },
});
