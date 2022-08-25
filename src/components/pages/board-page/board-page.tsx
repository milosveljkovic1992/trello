import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { RootState, useAppDispatch } from 'store';
import { fetchBoardListsAndCards, resetBoard } from 'store/board-slice';
import { openModal } from 'store/popup-slice';
import { getCard, resetCard } from 'store/card-slice';
import { dropCard } from 'store/cards-slice';
import { throwError } from 'store/error-slice';

import { calculatePosition } from 'utils/calculatePosition';

import { LoadingSpinner } from 'components/atoms';
import { AddList } from 'components/molecules';
import { Board, SingleList } from 'components/organisms';

export const BoardPage = () => {
  const dispatch = useAppDispatch();

  const popupModalOpen = useSelector((state: RootState) => state.popup.open);
  const hasCardFetchingFailed = useSelector(
    (state: RootState) => state.card.hasFailed,
  );
  const hasBoardFetchingFailed = useSelector(
    (state: RootState) => state.board.hasFailed,
  );
  const board = useSelector((state: RootState) => state.board.details);
  const { isLoading } = useSelector((state: RootState) => state.board);
  const lists = useSelector((state: RootState) => state.lists.listsArray);
  const cards = useSelector((state: RootState) => state.cards.cardsArray);
  const isCardLoading = useSelector((state: RootState) => state.card.isLoading);

  const navigate = useNavigate();
  const urlParams = useParams();
  const { boardId, cardUrl } = urlParams;

  useEffect(() => {
    if (urlParams['*'] && !popupModalOpen) {
      dispatch(openModal());
    }
    if (cardUrl && isCardLoading) {
      dispatch(getCard({ id: cardUrl }));
    }
    if (cardUrl && hasCardFetchingFailed) {
      navigate(`/b/${board.id}`);
      dispatch(throwError('Could not get card'));
      dispatch(resetCard());
    }
  }, [cardUrl, urlParams, isCardLoading, hasCardFetchingFailed]);

  useEffect(() => {
    if (boardId && isLoading) {
      dispatch(fetchBoardListsAndCards(boardId));
    }
    if (boardId && hasBoardFetchingFailed) {
      navigate('/');
      dispatch(throwError('Could not get board info'));
      dispatch(resetBoard());
    }
  }, [boardId, isLoading, hasBoardFetchingFailed]);

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
          {!!cardUrl && <Outlet />}

          <Board>
            {board && lists && (
              <DragDropContext onDragEnd={handleDragEnd}>
                <div className="board-inner-container">
                  {lists.map((list) => (
                    <SingleList key={list.id} list={list} />
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
