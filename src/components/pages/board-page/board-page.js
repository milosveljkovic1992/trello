import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

import { openModal } from 'store/popup-slice';
import { getCard } from 'store/card-slice';
import { setListsArray } from 'store/lists-slice';
import { setCards } from 'store/cards-slice';
import { throwError } from 'store/error-slice';

import { LoadingSpinner } from 'components/atoms';
import { AddList, Board } from 'components/molecules';
import { CardPopup } from 'components/pages';
import { SingleList } from 'components/organisms';

export const BoardPage = () => {
  const dispatch = useDispatch();
  const popupModalOpen = useSelector((state) => state.popup.open);
  const hasFetchingFailed = useSelector((state) => state.card.hasFailed);
  const lists = useSelector((state) => state.lists.listsArray);

  const navigate = useNavigate();
  const urlParams = useParams();
  const { boardId } = urlParams;
  const { cardUrl } = urlParams;

  const [pos, setPos] = useState(1);
  const [creatingNewList, setCreatingNewList] = useState(false);
  const [isBoardUpdated, setIsBoardUpdated] = useState(false);
  const [board, setBoard] = useState(null);
  const [boardName, setBoardName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      titleRef.current.select();
    }
    if (urlParams['*']) {
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
    if (!!boardId || isBoardUpdated) {
      const fetchBoardListsAndCards = async () => {
        try {
          const response = await axios.get(
            `/1/batch?urls=/1/boards/${boardId},/1/boards/${boardId}/lists,/1/boards/${boardId}/cards`,
          );
          const fetchedBoard = response.data[0][200];
          const fetchedLists = response.data[1][200];
          const fetchedCards = response.data[2][200];
          setBoard(fetchedBoard);
          setBoardName(fetchedBoard.name);

          dispatch(setListsArray(fetchedLists));
          const lastList = fetchedLists[fetchedLists.length - 1];
          setPos(lastList ? lastList.pos + 1000 : 5000);
          dispatch(setCards(fetchedCards));
          console.log(fetchedCards);
        } catch (error) {
          dispatch(throwError('Could not get board info'));
        }
      };

      fetchBoardListsAndCards();
      setIsLoading(false);
      setIsBoardUpdated(false);
    }
  }, [isBoardUpdated, boardId]);

  const handleBoardName = () => {
    const submitBoardName = async () => {
      try {
        await axios.put(`/1/boards/${boardId}?name=${boardName}`);
      } catch (error) {
        dispatch(throwError('Could not edit board name'));
        setBoardName(board.name);
      }
      setIsActive(false);
    };
    if (boardName.trim().length > 0) {
      submitBoardName();
    }
  };

  const handleHomeButton = () => {
    navigate('/');
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
              <SingleList
                key={list.id}
                listId={list.id}
                name={list.name}
                setIsBoardUpdated={setIsBoardUpdated}
              />
            ))}

            <AddList
              creatingNewList={creatingNewList}
              setCreatingNewList={setCreatingNewList}
              boardId={boardId}
              setIsBoardUpdated={setIsBoardUpdated}
              pos={pos}
            />
          </div>
        )}
      </Board>
    </>
  );
};
