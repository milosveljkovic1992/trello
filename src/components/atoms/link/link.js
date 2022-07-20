import { LinkElement } from './link-styles';

export const Link = ({ children, ...restProps }) => {
  return <LinkElement {...restProps}>{children}</LinkElement>;
};
