import { ChangeEventHandler, MouseEvent } from 'react';

import { SearchInputProps } from './SearchInput.types';
import { StyledContainer, StyledInput, StyledButton } from './SearchInput.styles';

export function SearchInput({ onChange, value, onReset, disabled, refElem }: SearchInputProps) {
  const onSearchInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => onChange(evt.target.value);

  const onResetBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (onReset) onReset();
  };

  return (
    <StyledContainer disableGutters>
      <StyledInput
        variant="outlined"
        className="form-control search-input"
        placeholder="search"
        onChange={onSearchInputChange}
        value={value}
        disabled={disabled}
        inputRef={refElem}
      />
      {value && (
        <StyledButton variant="text" onClick={onResetBtnClick} disabled={disabled}>
          <i className="fa fa-close"></i>
        </StyledButton>
      )}
    </StyledContainer>
  );
}
