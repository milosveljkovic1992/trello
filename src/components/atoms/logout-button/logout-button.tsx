import { useLogout } from 'hooks/useLogout';

import { LogoutButtonProps } from './logout-button.types';
import { Button } from './logout-button.styles';

export const LogoutButton = ({ fixed }: LogoutButtonProps) => {
  const { handleLogout } = useLogout();

  return (
    <Button onClick={handleLogout} fixed={fixed}>
      Log Out
    </Button>
  );
};
