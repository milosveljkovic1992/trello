import { Dispatch, SetStateAction, DragEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { CardType } from 'store/card-slice';

import { moveCard } from 'store/cards-slice';
import {
  startDrag,
  dragOverCard,
  dragOverList,
  endDrag,
} from 'store/drag-drop-slice';

export const useDragAndDrop = ({
  setIsListUpdated,
}: {
  setIsListUpdated: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const { draggedCard, targetListId, targetPosition } = useSelector(
    (state: RootState) => state.dragDrop,
  );

  const handleDragStart = (
    e: DragEvent<HTMLAnchorElement>,
    card: CardType,
    index: number,
  ) => {
    const listId = card.idList;
    const target = e.target as Element;
    dispatch(startDrag({ card, index }));
    dispatch(dragOverList({ listId }));
    target.classList.add('drag-active');
  };

  const handleDragEnterCard = (
    e: DragEvent<HTMLAnchorElement>,
    card: CardType,
    index: number,
  ) => {
    let { pos } = card;
    const isFirst = index === 0;

    if (isFirst) {
      pos = pos / 2;
    } else if (draggedCard.pos > card.pos) {
      pos = pos - 1;
    }

    dispatch(dragOverCard({ index, pos }));
  };

  const handleDragEnd = (e: DragEvent<HTMLAnchorElement>) => {
    dispatch(
      moveCard({
        card: draggedCard,
        targetList: targetListId,
        targetPosition,
        setIsListUpdated,
      }),
    );
    const target = e.target as Element;

    setIsListUpdated(true);
    dispatch(endDrag());

    target.classList.remove('drag-active');
  };

  return { handleDragStart, handleDragEnterCard, handleDragEnd };
};
