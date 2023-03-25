import React from 'react';
import { PropFilter } from './Filter.types';
import { FILTER_TYPES } from 'constants/statusFilterTypes';

export const Filter = ({ value, onChange }: PropFilter) => {
  return (
    <div className="btn-group">
      <button
        type="button"
        onClick={() => onChange(FILTER_TYPES.ALL)}
        className={`btn ${value === FILTER_TYPES.ALL ? 'btn-info' : 'btn-outline-secondary'}`}>
        All
      </button>
      <button
        type="button"
        onClick={() => onChange(FILTER_TYPES.ACTIVE)}
        className={`btn ${value === FILTER_TYPES.ACTIVE ? 'btn-info' : 'btn-outline-secondary'}`}>
        Active
      </button>
      <button
        type="button"
        onClick={() => onChange(FILTER_TYPES.DONE)}
        className={`btn ${value === FILTER_TYPES.DONE ? 'btn-info' : 'btn-outline-secondary'}`}>
        Done
      </button>
      <button
        type="button"
        onClick={() => onChange(FILTER_TYPES.IMPORTANT)}
        className={`btn ${value === FILTER_TYPES.IMPORTANT ? 'btn-info' : 'btn-outline-secondary'}`}>
        Important
      </button>
    </div>
  );
};
