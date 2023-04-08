import { useState } from 'react';
import { Card, Grid, CardContent, CardActions, Button, ButtonGroup } from '@mui/material';
import { PropsEntityType } from './Task.types';
import { StyledButton, StyledTypography, StyledCardHeader } from './Task.styles';
import { EDIT, ROOT } from 'constants/index';
import { Link } from 'components/index';

export const Task = ({ elem, changeComplete, changeImportant, deleteTask }: PropsEntityType) => {
  const { id, isDone, isImportant, name, info } = elem;

  const [deleteStatus, setDeleteStatus] = useState(false);

  const clickChangeComplete = () => changeComplete(id, isDone);
  const clickChangeImportant = () => changeImportant(id, isImportant);

  const handleDeleteTask = () => {
    setDeleteStatus(false);
    deleteTask(id);
  };

  return (
    <Grid item xs={12}>
      <Card variant="outlined">
        <StyledCardHeader title={name} />
        <CardContent>
          <StyledTypography paragraph>{info}</StyledTypography>
        </CardContent>
        <CardActions>
          <ButtonGroup variant="contained" fullWidth>
            <Button
              variant={isImportant ? 'contained' : 'outlined'}
              type="button"
              onClick={() => clickChangeImportant()}
              disabled={isDone}>
              Важное
            </Button>
            <Button
              color="success"
              variant={isDone ? 'contained' : 'outlined'}
              type="button"
              onClick={() => clickChangeComplete()}>
              Выполнено
            </Button>
            <StyledButton variant="outlined" color="secondary">
              <Link path={`${ROOT}${EDIT}/${id}`}>
                Изменить <i className="fa fa-pencil" />
              </Link>
            </StyledButton>
            {deleteStatus ? (
              <>
                <Button variant="contained" type="button" color="error" onClick={() => handleDeleteTask()}>
                  <i className="fa fa-check"></i>
                </Button>
                <Button variant="outlined" type="button" color="secondary" onClick={() => setDeleteStatus(false)}>
                  X
                </Button>
              </>
            ) : (
              <Button variant="contained" color="error" type="button" onClick={() => setDeleteStatus(true)}>
                <i className="fa fa-trash-o" />
              </Button>
            )}
          </ButtonGroup>
        </CardActions>
      </Card>
    </Grid>
  );
};
