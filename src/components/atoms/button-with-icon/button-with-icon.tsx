import { Button } from './button-with-icon.styles';

import { ButtonWithIconProps } from './button-with-icon.types';

export const ButtonWithIcon = ({
  children,
  onClick,
  icon,
}: ButtonWithIconProps) => {
  return (
    <Button onClick={onClick}>
      <span>{icon}</span>
      <span>{children}</span>
    </Button>
  );
};
