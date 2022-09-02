import { LogoutButtonProps } from './logout-button.types';
import { Button } from './logout-button.styles';

export const LogoutButton = ({ fixed, handleClick }: LogoutButtonProps) => {
  return (
    <Button onClick={handleClick} fixed={fixed}>
      Log Out
    </Button>
  );
};
