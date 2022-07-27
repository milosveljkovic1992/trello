import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from 'store/auth-slice';
import { resetBoard } from 'store/board-slice';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(resetBoard());
    localStorage.removeItem('trelloToken');
    dispatch(logout());
    navigate('/');
  };

  return { handleLogout };
};
