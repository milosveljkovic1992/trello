import { LogoutButtonProps } from './logout-button.types';
import { Button } from './logout-button.styles';

export const LogoutButton = ({
  isHomePage,
  handleClick,
}: LogoutButtonProps) => {
  return (
    <Button onClick={handleClick} isHomePage={isHomePage}>
      Log Out
    </Button>
  );
};
