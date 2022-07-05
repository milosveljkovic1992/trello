import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';

import { LoadingSpinner, LogoutButton } from 'components/atoms';
import { setBoards, addBoard, deleteBoard } from 'store/boards-slice';

import { Container } from './landing-page-styles';

export const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector((state) => state.boards.boardsArray);
  const isLoading = useSelector((state) => state.boards.isLoading);
  const member = useSelector((state) => state.member);

  const [isInputActive, setIsInputActive] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const inputRef = React.useRef(null);
  const btnRef = React.useRef(null);

  const handleActive = () => {
    setIsInputActive(true);
  };

  const handleClick = (e, board) => {
    e.stopPropagation();
    if (e.target.closest('.delete-btn')) return;

    const fetchBoard = async () => {
      await axios.get(`/1/boards/${board.id}`);
    };

    try {
      fetchBoard();
      navigate(`/b/${board.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateNew = () => {
    const sendCreateRequest = async () => {
      const response = await axios.post(`/1/boards/?name=${newBoardTitle}`);
      dispatch(addBoard(response.data));
    };

    if (newBoardTitle.trim().length > 0) {
      try {
        sendCreateRequest();
      } catch (error) {
        console.log(error);
      }
    }

    setNewBoardTitle('');
    setIsInputActive(false);
  };

  const handleDelete = (board) => {
    const sendDeleteRequest = async () => {
      await axios.delete(`/1/boards/${board.id}`);
    };

    try {
      sendDeleteRequest();
      dispatch(deleteBoard(board));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
      btnRef.current.classList.add('slide-in-top');
    }
  }, [boards, isInputActive]);

  useEffect(() => {
    const getMemberBoards = async () => {
      const response = await axios.get(`/1/members/${member.id}/boards`);
      dispatch(setBoards(response.data));
    };

    if (member.id && isLoading) {
      try {
        getMemberBoards();
      } catch (error) {
        console.log(error);
      }
    }
  }, [dispatch, member, isLoading]);

  if (isLoading) {
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
                  <div className="board-title">{board.name}</div>
                  <div
                    className="delete-container delete-btn"
                    onClick={() => handleDelete(board)}
                  >
                    <FaTrashAlt />
                  </div>
                </div>
              </div>
            ))}

          {boards.length < 10 && (
            <div className="single-board-container">
              <div className="board" onClick={handleActive}>
                <div
                  className={`board-title ${isInputActive && 'isInputActive'}`}
                >
                  Add new
                </div>
                <textarea
                  ref={inputRef}
                  className={`${!isInputActive && 'isInputActive'}`}
                  placeholder="Start typing..."
                  value={newBoardTitle}
                  onBlur={handleCreateNew}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                ></textarea>
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
