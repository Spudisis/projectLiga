import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { PropFilter } from './Filter.types';
import { FILTER_TYPES } from 'constants/index';

export const Filter = ({ value, onChange, disabled }: PropFilter) => {
  return (
    <ToggleButtonGroup color="standard">
      <ToggleButton
        type="button"
        disabled={disabled}
        onClick={() => onChange(FILTER_TYPES.ALL)}
        selected={value === FILTER_TYPES.ALL}
        value={FILTER_TYPES.ALL}>
        {FILTER_TYPES.ALL}
      </ToggleButton>
      <ToggleButton
        type="button"
        disabled={disabled}
        onClick={() => onChange(FILTER_TYPES.ACTIVE)}
        selected={value === FILTER_TYPES.ACTIVE}
        value={FILTER_TYPES.ACTIVE}>
        {FILTER_TYPES.ACTIVE}
      </ToggleButton>
      <ToggleButton
        type="button"
        disabled={disabled}
        onClick={() => onChange(FILTER_TYPES.DONE)}
        selected={value === FILTER_TYPES.DONE}
        value={FILTER_TYPES.DONE}>
        {FILTER_TYPES.DONE}
      </ToggleButton>
      <ToggleButton
        type="button"
        disabled={disabled}
        onClick={() => onChange(FILTER_TYPES.IMPORTANT)}
        selected={value === FILTER_TYPES.IMPORTANT}
        value={FILTER_TYPES.IMPORTANT}>
        {FILTER_TYPES.IMPORTANT}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
