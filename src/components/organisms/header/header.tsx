import { useEffect, useRef, useState, KeyboardEvent } from 'react';

import { ImHome } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState, useAppDispatch } from 'store';
import { logout } from 'store/auth-slice';
import {
  resetBoard,
  resetCreatingNewList,
  submitBoardName,
} from 'store/board-slice';
import { resetCreatingNewCard } from 'store/cards-slice';

import { IconButton, LogoutButton } from 'components/molecules';

import { HeaderContainer } from './header.styles';

export const Header = ({ isHomePage }: { isHomePage: boolean }) => {
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
    if (boardName.trim().length > 0 && boardName !== board.name) {
      dispatch(submitBoardName({ board, boardName }));
    }
    handleEditActive(false);
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      handleBoardName();
    }
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
    <HeaderContainer isHomePage={isHomePage} role="page-header">
      {!isHomePage && (
        <>
          <IconButton handleClick={handleHomeButton} icon={<ImHome />} />

          <div className="board-title-container">
            {!isEditNameActive && (
              <h1
                className="board-title"
                onClick={() => handleEditActive(true)}
              >
                {board.name}
              </h1>
            )}

            {isEditNameActive && (
              <input
                className="board-title-input"
                ref={titleRef}
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                onKeyDown={handleEnter}
                onBlur={handleBoardName}
                size={boardName.length - 6}
                data-testid="board-title-input"
              ></input>
            )}
          </div>
        </>
      )}

      <LogoutButton isHomePage={isHomePage} handleClick={handleLogoutButton} />
    </HeaderContainer>
  );
};
