import { useRef, useEffect } from 'react';
import { FormObserverType } from './FormSearch.types';
import { SearchParams } from 'domains/index';
import { FILTER_TYPES } from 'constants/index';

export function useDebouncedFunction(func: (params: SearchParams) => void, delay: number, cleanUp = false) {
  const timeoutRef = useRef<null | NodeJS.Timeout>(null);

  function clearTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

  return (params: FormObserverType) => {
    clearTimer();
    const data = {
      searchValue: params.searchValue || '',
      filterValue: params.filterValue || FILTER_TYPES.ALL,
    };
    timeoutRef.current = setTimeout(() => func(data), delay);
  };
}
