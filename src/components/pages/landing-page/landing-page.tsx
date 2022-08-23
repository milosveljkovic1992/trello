import { useEffect, useState, useRef, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FaTrashAlt } from 'react-icons/fa';

import { LoadingSpinner } from 'components/atoms';
import { LogoutButton } from 'components/molecules';
import { setBoards, addBoard, sendDeleteRequest } from 'store/boards-slice';
import { RootState, useAppDispatch } from 'store';
import type { BoardType } from 'store/board-slice';

import { Container } from './landing-page-styles';
import { throwError } from 'store/error-slice';

export const LandingPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const boards = useSelector((state: RootState) => state.boards.boardsArray);
  const isLoading = useSelector((state: RootState) => state.boards.isLoading);
  const member = useSelector((state: RootState) => state.member);

  const [isInputActive, setIsInputActive] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleActive = () => {
    setIsInputActive(true);
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>, board: BoardType) => {
    e.stopPropagation();
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

  useEffect(() => {
    if (isInputActive) {
      inputRef.current?.focus();
      btnRef.current?.classList.add('slide-in-top');
    }
  }, [boards, isInputActive]);

  useEffect(() => {
    if (member.id && isLoading) {
      dispatch(setBoards(member.id));
    }
  }, [dispatch, isLoading]);

  if (member.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <div className="inner-container">
        <div className="landing-header">
          <h2>Your workplaces</h2>
        </div>

        <div className="boards-container">
          {boards.length > 0 &&
            boards.map((board) => (
              <div
                data-testid="single-board"
                className="single-board-container"
                key={board.id}
                onClick={(e) => handleClick(e, board)}
                style={{
                  backgroundImage: board.prefs.backgroundImageScaled
                    ? `url("${board.prefs.backgroundImageScaled[2].url}")`
                    : 'none',
                }}
              >
                <div className="board">
                  <h3 className="board-title">{board.name}</h3>
                  <div
                    data-testid="delete-board-button"
                    aria-label="delete-board"
                    className="delete-container delete-btn"
                    onClick={() => handleDelete(board.id)}
                  >
                    <FaTrashAlt />
                  </div>
                </div>
              </div>
            ))}

          {!isLoading && boards.length < 10 && (
            <div className="single-board-container">
              <div className="board" onClick={handleActive}>
                {!isInputActive && <h3 className="board-title">Add new</h3>}
                {isInputActive && (
                  <textarea
                    ref={inputRef}
                    placeholder="Start typing..."
                    value={newBoardTitle}
                    onBlur={handleCreateNew}
                    onChange={(e) => setNewBoardTitle(e.target.value)}
                  ></textarea>
                )}
              </div>

              <button
                ref={btnRef}
                className={`create-new-button ${
                  !isInputActive && 'isInputActive'
                }`}
                onClick={handleCreateNew}
              >
                Create
              </button>
            </div>
          )}
        </div>
      </div>

      <LogoutButton fixed={true} />
    </Container>
  );
};
