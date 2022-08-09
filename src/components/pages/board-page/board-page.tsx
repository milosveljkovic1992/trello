import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { RootState, useAppDispatch } from 'store';
import { fetchBoardListsAndCards } from 'store/board-slice';
import { openModal } from 'store/popup-slice';
import { getCard } from 'store/card-slice';
import { dropCard } from 'store/cards-slice';

import { calculatePosition } from 'utils/calculatePosition';

import { LoadingSpinner } from 'components/atoms';
import { AddList, Board } from 'components/molecules';
import { CardPopup } from 'components/pages';
import { SingleList } from 'components/organisms';

export const BoardPage = () => {
  const dispatch = useAppDispatch();

  const popupModalOpen = useSelector((state: RootState) => state.popup.open);
  const hasFetchingFailed = useSelector(
    (state: RootState) => state.card.hasFailed,
  );
  const board = useSelector((state: RootState) => state.board.details);
  const { isLoading } = useSelector((state: RootState) => state.board);
  const lists = useSelector((state: RootState) => state.lists.listsArray);
  const cards = useSelector((state: RootState) => state.cards.cardsArray);

  const navigate = useNavigate();
  const urlParams = useParams();
  const { boardId } = urlParams;
  const { cardUrl } = urlParams;

  const [isCreatingNewList, setIsCreatingNewList] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive) {
      titleRef.current?.select();
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

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const targetIndex = destination.index;
    const targetList = cards.filter(
      ({ idList }) => destination.droppableId === idList,
    );

    const previousIndex = source.index;
    const previousList = cards.filter(
      ({ idList }) => source.droppableId === idList,
    );
    const targetPosition = calculatePosition({
      targetIndex,
      targetList,
      previousIndex,
      previousList,
    });
    const targetCard = cards.find((card) => card.id === draggableId);

    if (targetCard) {
      dispatch(
        dropCard({
          targetCard,
          targetListId: destination.droppableId,
          targetPosition,
          startListId: source.droppableId,
        }),
      );
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {boardId && (
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
            isActive={isActive}
            setIsActive={setIsActive}
          >
            {board && lists && (
              <DragDropContext onDragEnd={handleDragEnd}>
                <div className="board-inner-container">
                  {lists.map((list) => (
                    <SingleList
                      key={list.id}
                      listId={list.id}
                      name={list.name}
                    />
                  ))}

                  <AddList
                    isCreatingNewList={isCreatingNewList}
                    setIsCreatingNewList={setIsCreatingNewList}
                    boardId={boardId}
                  />
                </div>
              </DragDropContext>
            )}
          </Board>
        </>
      )}
    </>
  );
};
