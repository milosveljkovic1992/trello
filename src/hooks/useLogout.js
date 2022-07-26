import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from 'store/auth-slice';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('trelloToken');
    dispatch(logout());
    navigate('/');
  };

  return { handleLogout };
};
