import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ImHome } from 'react-icons/im';

import { RootState, useAppDispatch } from 'store';
import { logout } from 'store/auth-slice';
import {
  submitBoardName,
  resetBoard,
  resetCreatingNewList,
} from 'store/board-slice';
import { resetCreatingNewCard } from 'store/cards-slice';

import { IconButton, LogoutButton } from 'components/molecules';

import { BoardProps } from './board.types';
import { Container } from './board.styles';

export const Board = ({ children }: BoardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const board = useSelector((state: RootState) => state.board.details);
  const [boardName, setBoardName] = useState(board.name);
  const [isEditNameActive, setIsEditNameActive] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

  const handleEditActive = (bool: boolean) => {
    setBoardName(board.name);
    setIsEditNameActive(bool);
  };

  const handleBoardName = () => {
    if (boardName.trim().length > 0) {
      dispatch(submitBoardName({ board, boardName }));
    }
    handleEditActive(false);
  };

  const handleHomeButton = () => {
    navigate('/');
    dispatch(resetBoard());
    dispatch(resetCreatingNewList());
    dispatch(resetCreatingNewCard());
  };

  const handleLogoutButton = () => {
    dispatch(resetBoard());
    localStorage.removeItem('trelloToken');
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    if (isEditNameActive) {
      titleRef.current?.select();
    }
  }, [isEditNameActive]);

  return (
    <Container backgroundImage={board?.prefs.backgroundImage} role="board">
      <header className="board-header" role="page-header">
        <IconButton handleClick={handleHomeButton} icon={<ImHome />} />

        <div className="board-title-container">
          {boardName && !isEditNameActive && (
            <h1 className="board-title" onClick={() => handleEditActive(true)}>
              {board.name}
            </h1>
          )}

          {isEditNameActive && (
            <input
              className="board-title-input"
              ref={titleRef}
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              onBlur={handleBoardName}
              size={boardName.length - 6}
              data-testid="board-title-input"
            ></input>
          )}
        </div>

        <LogoutButton fixed={false} handleClick={handleLogoutButton} />
      </header>

      {children}
    </Container>
  );
};
