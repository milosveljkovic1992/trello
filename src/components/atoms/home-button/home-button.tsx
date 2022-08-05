import { useNavigate } from 'react-router-dom';
import { ImHome } from 'react-icons/im';

import { useAppDispatch } from 'store';
import { resetBoard } from 'store/board-slice';

import { IconContainer } from './home-button.styles';

export const HomeButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleHomeButton = () => {
    navigate('/');
    dispatch(resetBoard());
  };

  return (
    <IconContainer
      className="board-icon-container"
      onClick={handleHomeButton}
      role="home-button"
    >
      <ImHome />
    </IconContainer>
  );
};
