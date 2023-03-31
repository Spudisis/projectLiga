import { PropFilter } from './Filter.types';
import { ClassNames } from './Filter.constants';
import { FILTER_TYPES } from 'constants/index';

export const Filter = ({ value, onChange, disabled }: PropFilter) => {
  return (
    <div className="btn-group">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(FILTER_TYPES.ALL)}
        className={`btn ${value === FILTER_TYPES.ALL ? ClassNames.active : ClassNames.inactive}`}>
        {FILTER_TYPES.ALL}
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(FILTER_TYPES.ACTIVE)}
        className={`btn ${value === FILTER_TYPES.ACTIVE ? ClassNames.active : ClassNames.inactive}`}>
        {FILTER_TYPES.ACTIVE}
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(FILTER_TYPES.DONE)}
        className={`btn ${value === FILTER_TYPES.DONE ? ClassNames.active : ClassNames.inactive}`}>
        {FILTER_TYPES.DONE}
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(FILTER_TYPES.IMPORTANT)}
        className={`btn ${value === FILTER_TYPES.IMPORTANT ? ClassNames.active : ClassNames.inactive}`}>
        {FILTER_TYPES.IMPORTANT}
      </button>
    </div>
  );
};
