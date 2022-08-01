import { LinkElement } from './link.styles';
import { LinkProps } from 'react-router-dom';

export const Link = ({ children, ...restProps }: LinkProps) => {
  return <LinkElement {...restProps}>{children}</LinkElement>;
};
