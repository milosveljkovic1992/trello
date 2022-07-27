import { useDispatch, useSelector } from 'react-redux';

import { moveCard } from 'store/cards-slice';
import {
  startDrag,
  dragOverCard,
  dragOverList,
  endDrag,
} from 'store/drag-drop-slice';

export const useDragAndDrop = ({ setIsListUpdated }) => {
  const dispatch = useDispatch();
  const { draggedCard, targetListId, targetPosition } = useSelector(
    (state) => state.dragDrop,
  );

  const handleDragStart = (e, card, index) => {
    const listId = card.idList;
    dispatch(startDrag({ card, index }));
    dispatch(dragOverList({ listId }));
    e.target.classList.add('drag-active');
  };

  const handleDragEnterCard = (e, card, index) => {
    let { pos } = card;
    const isFirst = index === 0;

    if (isFirst) {
      pos = pos / 2;
    } else if (draggedCard.pos > card.pos) {
      pos = pos - 1;
    }

    dispatch(dragOverCard({ index, pos }));
  };

  const handleDragEnd = (e) => {
    dispatch(
      moveCard({
        card: draggedCard,
        targetList: targetListId,
        targetPosition,
        setIsListUpdated,
      }),
    );

    setIsListUpdated(true);
    dispatch(endDrag());

    e.target.classList.remove('drag-active');
  };

  return { handleDragStart, handleDragEnterCard, handleDragEnd };
};
