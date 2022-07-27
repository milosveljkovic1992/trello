import { ReactNode } from 'react';
import { Button } from './add-button.styles';

interface AddButtonProps {
  children: ReactNode;
  onClick: () => void;
  icon: ReactNode;
}

export const AddButton = ({ children, onClick, icon }: AddButtonProps) => {
  return (
    <Button onClick={onClick}>
      <span>{icon}</span>
      <span>{children}</span>
    </Button>
  );
};
