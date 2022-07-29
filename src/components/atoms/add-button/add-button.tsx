import { Button } from './add-button.styles';

import { AddButtonProps } from './add-button.types';

export const AddButton = ({ children, onClick, icon }: AddButtonProps) => {
  return (
    <Button onClick={onClick}>
      <span>{icon}</span>
      <span>{children}</span>
    </Button>
  );
};
