import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from 'store/auth-slice';
import { Button } from './logout-button-styles';

export const LogoutButton = ({ fixed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
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
