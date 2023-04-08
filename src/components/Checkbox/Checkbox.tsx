import React from 'react';
import { FormControlLabel, Switch, Box } from '@mui/material';

import { CheckboxProps } from './Checkbox.types';

export function Checkbox({ label, checked, onChange, disabled }: CheckboxProps) {
  return (
    <Box mb={2}>
      <FormControlLabel control={<Switch checked={checked} onChange={onChange} disabled={disabled} />} label={label} />
    </Box>
  );
}
