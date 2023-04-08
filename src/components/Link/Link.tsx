import React from 'react';
import { StyledLinkType } from './Link.types';
import { StyledLink } from './Link.styles';

export const Link = ({ children, path }: StyledLinkType) => {
  return <StyledLink to={path}>{children}</StyledLink>;
};
