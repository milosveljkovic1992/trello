import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useParams, useNavigate } from 'react-router-dom';

import {
  fetchBoardListsAndCards,
  resetBoard,
  submitBoardName,
} from 'store/board-slice';
import { openModal } from 'store/popup-slice';
import { getCard } from 'store/card-slice';

import { LoadingSpinner } from 'components/atoms';
import { AddList, Board } from 'components/molecules';
import { CardPopup } from 'components/pages';
import { SingleList } from 'components/organisms';

export const BoardPage = () => {
  const dispatch = useDispatch();
  const popupModalOpen = useSelector((state) => state.popup.open);
  const hasFetchingFailed = useSelector((state) => state.card.hasFailed);
  const board = useSelector((state) => state.board.details);
  const { isLoading } = useSelector((state) => state.board);
  const lists = useSelector((state) => state.lists.listsArray);

  const navigate = useNavigate();
  const urlParams = useParams();
  const { boardId } = urlParams;
  const { cardUrl } = urlParams;

  const [isCreatingNewList, setIsCreatingNewList] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      titleRef.current.select();
    }
    if (urlParams['*'] && !popupModalOpen) {
      dispatch(openModal(cardUrl));
    }
    if (cardUrl) {
      dispatch(getCard({ id: cardUrl }));
    }
    if (cardUrl && hasFetchingFailed) {
      navigate(`/b/${board.id}`);
    }
  }, [dispatch, isActive, cardUrl, urlParams]);

  useEffect(() => {
    if (!!boardId && isLoading) {
      dispatch(fetchBoardListsAndCards({ boardId, setBoardName }));
    }
  }, [boardId, isLoading]);

  const handleBoardName = () => {
    dispatch(submitBoardName({ board, boardName, setBoardName }));
    if (boardName.trim().length > 0) {
      submitBoardName();
    }
    setIsActive(false);
  };

  const handleHomeButton = () => {
    navigate('/');
    dispatch(resetBoard());
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {!!popupModalOpen && !!cardUrl && (
        <Routes>
          <Route path={`c/${cardUrl}`} element={<CardPopup />} />
        </Routes>
      )}
      <Board
        ref={titleRef}
        board={board}
        boardName={boardName}
        setBoardName={setBoardName}
        handleBoardName={handleBoardName}
        handleHomeButton={handleHomeButton}
        isActive={isActive}
        setIsActive={setIsActive}
      >
        {board && lists && (
          <div className="board-inner-container">
            {lists.map((list) => (
              <SingleList key={list.id} listId={list.id} name={list.name} />
            ))}

            <AddList
              isCreatingNewList={isCreatingNewList}
              setIsCreatingNewList={setIsCreatingNewList}
              boardId={boardId}
            />
          </div>
        )}
      </Board>
    </>
  );
};
