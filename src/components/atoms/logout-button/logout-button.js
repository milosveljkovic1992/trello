import { useLogout } from 'hooks/useLogout';

import { Button } from './logout-button-styles';

export const LogoutButton = ({ fixed }) => {
  const { handleLogout } = useLogout();

  return (
    <Button onClick={handleLogout} fixed={fixed}>
      Log Out
    </Button>
  );
};
