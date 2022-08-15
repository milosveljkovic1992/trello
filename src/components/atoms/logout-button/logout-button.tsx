import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';

import { logout } from 'store/auth-slice';
import { resetBoard } from 'store/board-slice';

import { LogoutButtonProps } from './logout-button.types';
import { Button } from './logout-button.styles';

export const LogoutButton = ({ fixed }: LogoutButtonProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(resetBoard());
    localStorage.removeItem('trelloToken');
    dispatch(logout());
    navigate('/');
  };

  return (
    <Button onClick={handleLogout} fixed={fixed}>
      Log Out
    </Button>
  );
};
