import {
  useEffect,
  useState,
  MouseEvent,
  ChangeEvent,
  KeyboardEvent,
} from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FaTrashAlt } from 'react-icons/fa';

import { RootState, useAppDispatch } from 'store';
import { BoardType, resetBoard } from 'store/board-slice';
import { setBoards, addBoard, sendDeleteRequest } from 'store/boards-slice';
import { throwError } from 'store/error-slice';

import { LoadingSpinner } from 'components/atoms';
import { AddBoard, BoardCard } from 'components/molecules';

import { Container } from './landing-page-styles';

export const LandingPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const member = useSelector((state: RootState) => state.member);
  const boards = useSelector((state: RootState) => state.boards.boardsArray);
  const isLoading = useSelector((state: RootState) => state.boards.isLoading);

  const [isInputActive, setIsInputActive] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const handleActive = () => {
    setIsInputActive(true);
  };

  const handleReset = () => {
    setNewBoardTitle('');
    setIsInputActive(false);
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
    if (
      target.closest('.delete-btn') ||
      target.closest('.warning-modal-overlay')
    )
      return;
    navigate(`/b/${board.id}`);
  };

  const handleCreateNew = () => {
    if (newBoardTitle.trim().length > 0) {
      dispatch(addBoard(newBoardTitle));
    } else {
      dispatch(throwError('Board name cannot be empty'));
    }

    handleReset();
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      handleCreateNew();
    }
  };

  const handleBlur = (e: MouseEvent) => {
    const target = e.target as Element;
    if (
      !target.classList.contains('create-new-button') &&
      !target.closest('.board-box')
    ) {
      handleReset();
    }
  };

  const handleDelete = (boardId: string) => {
    dispatch(sendDeleteRequest(boardId));
  };

  useEffect(() => {
    if (member.id && isLoading) {
      const promise = dispatch(setBoards(member.id));

      return () => promise.abort();
    }
  }, [dispatch]);

  if (!member.id || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container onClick={handleBlur}>
      <div className="inner-container">
        <div className="landing-header">
          <h2>Your workplaces</h2>
        </div>

        <div className="boards-container">
          {boards.length > 0 &&
            boards.map((board) => (
              <BoardCard
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
              handleEnter={handleEnter}
            />
          )}
        </div>
      </div>
    </Container>
  );
};
