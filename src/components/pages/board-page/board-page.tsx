import { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
} from '@hello-pangea/dnd';

import { RootState, useAppDispatch } from 'store';
import { fetchBoardListsAndCards } from 'store/board-slice';
import { openModal } from 'store/popup-slice';
import { getCard } from 'store/card-slice';
import { dropCard } from 'store/cards-slice';

import { calculatePosition } from 'utils/calculatePosition';

import { LoadingSpinner } from 'components/atoms';
import { AddList, Board, SingleList } from 'components/organisms';

export const BoardPage = () => {
  const dispatch = useAppDispatch();

  const popupModalOpen = useSelector((state: RootState) => state.popup.open);
  const hasCardFetchingFailed = useSelector(
    (state: RootState) => state.card.hasFailed,
  );
  const hasBoardFetchingFailed = useSelector(
    (state: RootState) => state.board.hasFailed,
  );
  const { isLoading } = useSelector((state: RootState) => state.board);
  const board = useSelector((state: RootState) => state.board.details);
  const lists = useSelector((state: RootState) => state.lists.listsArray);
  const cards = useSelector((state: RootState) => state.cards.cardsArray);
  const isCardLoading = useSelector((state: RootState) => state.card.isLoading);
  const [dragSourceListId, setDragSourceListId] = useState('');
  const [dragTargetListId, setDragTargetListId] = useState('');
  const isInitialRender = useRef(true);

  const navigate = useNavigate();
  const urlParams = useParams();
  const { boardId, cardUrl } = urlParams;

  useEffect(() => {
    if (urlParams['*'] && !popupModalOpen) {
      dispatch(openModal());
    }
  }, [urlParams, cardUrl, isCardLoading]);

  useEffect(() => {
    if (cardUrl && board.id && !hasCardFetchingFailed) {
      dispatch(getCard({ id: cardUrl }));
    }
    if (boardId && isLoading && isInitialRender.current) {
      dispatch(fetchBoardListsAndCards(boardId));
      isInitialRender.current = false;
    }
    if (!isLoading && !board.id) {
      navigate('/');
    }
  }, [boardId, isLoading, hasBoardFetchingFailed, cardUrl]);

  const handleDragStart = (result: DragStart) => {
    setDragSourceListId(result.source.droppableId);
  };

  const handleDragUpdate = (result: DragUpdate) => {
    if (
      !!result.destination?.droppableId &&
      dragTargetListId !== result.destination?.droppableId
    ) {
      setDragTargetListId(result.destination?.droppableId);
    }
  };

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
    setDragSourceListId('');
    setDragTargetListId('');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {boardId && (
        <>
          {popupModalOpen && !!cardUrl && <Outlet />}
          <Board>
            {board && lists && (
              <DragDropContext
                onDragStart={handleDragStart}
                onDragUpdate={handleDragUpdate}
                onDragEnd={handleDragEnd}
              >
                <div className="board-inner-container">
                  {lists.map((list) => (
                    <SingleList
                      key={list.id}
                      list={list}
                      dragSourceListId={dragSourceListId}
                      dragTargetListId={dragTargetListId}
                    />
                  ))}

                  <AddList />
                </div>
              </DragDropContext>
            )}
          </Board>
        </>
      )}
    </>
  );
};
