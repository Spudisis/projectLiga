import { Button, TextField, Container } from '@mui/material';
import styled from '@emotion/styled';
export const StyledButton = styled(Button)({
  position: 'absolute',
  top: '10px',
  right: '0px',
  border: 'none',
  width: '30px',
  backgroundColor: 'inherit',
  fontSize: '25px',
  color: 'red',
});

export const StyledInput = styled(TextField)({
  width: 'auto',
  flexGrow: 1,
  marginRight: '3px',
});

export const StyledContainer = styled(Container)({
  position: 'relative',
  padding: '0px',
  width: 'auto',
  marginLeft: '0px',
});
