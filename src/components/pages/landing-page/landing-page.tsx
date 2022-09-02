import { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import { createPortal } from 'react-dom';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FaTrashAlt } from 'react-icons/fa';

import { RootState, useAppDispatch } from 'store';
import { logout } from 'store/auth-slice';
import { BoardType, resetBoard } from 'store/board-slice';
import { setBoards, addBoard, sendDeleteRequest } from 'store/boards-slice';
import { throwError } from 'store/error-slice';

import { LoadingPulse, LoadingSpinner } from 'components/atoms';
import { AddBoard, LogoutButton, SingleBoard } from 'components/molecules';

import { Container } from './landing-page-styles';

export const LandingPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const member = useSelector((state: RootState) => state.member);
  const boards = useSelector((state: RootState) => state.boards.boardsArray);
  const isLoading = useSelector((state: RootState) => state.boards.isLoading);
  const { loadingState } = useSelector((state: RootState) => state.loading);

  const [isInputActive, setIsInputActive] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const loadingRootElement = document.getElementById('loading-root');
  let isInitialRender = true;

  const handleActive = () => {
    setIsInputActive(true);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewBoardTitle(e.target.value);
  };

  const handleSelectBoard = (
    e: MouseEvent<HTMLDivElement>,
    board: BoardType,
  ) => {
    e.stopPropagation();
    dispatch(resetBoard());

    const target = e.target as Element;
    if (target.closest('.delete-btn')) return;
    navigate(`/b/${board.id}`);
  };

  const handleCreateNew = () => {
    if (newBoardTitle.trim().length > 0) {
      dispatch(addBoard(newBoardTitle));
    } else {
      dispatch(throwError('Board name cannot be empty'));
    }

    setNewBoardTitle('');
    setIsInputActive(false);
  };

  const handleDelete = (boardId: string) => {
    dispatch(sendDeleteRequest(boardId));
  };

  const handleLogoutButton = () => {
    dispatch(resetBoard());
    localStorage.removeItem('trelloToken');
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    if (isInitialRender && member.id && isLoading) {
      dispatch(setBoards(member.id));
      isInitialRender = false;
    }
  }, [dispatch, isLoading]);

  if (member.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {loadingState === 'loading' &&
        !isLoading &&
        loadingRootElement &&
        createPortal(<LoadingPulse />, loadingRootElement)}
      <Container>
        <div className="inner-container">
          <div className="landing-header">
            <h2>Your workplaces</h2>
          </div>

          <div className="boards-container">
            {boards.length > 0 &&
              boards.map((board) => (
                <SingleBoard
                  key={board.id}
                  board={board}
                  icon={<FaTrashAlt />}
                  handleClick={handleSelectBoard}
                  handleDelete={handleDelete}
                />
              ))}

            {!isLoading && boards.length < 10 && (
              <AddBoard
                handleActive={handleActive}
                isInputActive={isInputActive}
                newBoardTitle={newBoardTitle}
                handleCreateNew={handleCreateNew}
                handleTitleChange={handleTitleChange}
              />
            )}
          </div>
        </div>

        <LogoutButton fixed={true} handleClick={handleLogoutButton} />
      </Container>
    </>
  );
};
