import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';

import { logout } from 'store/auth-slice';
import { resetBoard } from 'store/board-slice';

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(resetBoard());
    localStorage.removeItem('trelloToken');
    dispatch(logout());
    navigate('/');
  };

  return { handleLogout };
};
