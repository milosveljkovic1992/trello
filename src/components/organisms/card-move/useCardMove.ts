import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'store';
import { closeEditPanel } from 'store/board-slice';
import { CardType } from 'store/card-slice';
import { moveCard } from 'store/cards-slice';

import { useCardMoveProps } from './useCardMove.types';

export const useCardMove = ({
  card,
  index,
  listRef,
  positionRef,
  setIsMoveOpen,
}: useCardMoveProps) => {
  const dispatch = useAppDispatch();
  const cards = useSelector((state: RootState) => state.cards.cardsArray);

  const [currentList, setCurrentList] = useState<CardType[]>([]);
  const [selectedList, setSelectedList] = useState<CardType[]>([]);
  const [targetList, setTargetList] = useState('');
  const [targetPosition, setTargetPosition] = useState(0);
  const [pos, setPos] = useState(5000);

  const getListsInfo = () => {
    setCurrentList(
      cards
        .filter(({ idList }) => card.idList === idList)
        .sort((a, b) => (a.pos < b.pos ? -1 : 1)),
    );
    setSelectedList(
      cards
        .filter(({ idList }) => card.idList === idList)
        .sort((a, b) => (a.pos < b.pos ? -1 : 1)),
    );
    setTargetList(card.idList);
  };

  const handleSelect = () => {
    if (listRef.current) {
      const listId = listRef.current.value;

      setSelectedList(
        cards
          .filter((card) => card.idList === listId)
          .sort((a, b) => (a.pos < b.pos ? -1 : 1)),
      );
      setTargetList(listId);
      setTargetPosition(0);
    }
  };

  const handlePosition = () => {
    const selectedPosition = Number(positionRef.current?.value);
    setTargetPosition(selectedPosition);

    const isSameList = currentList[0].idList === selectedList[0].idList;
    const isLastIndex = selectedPosition === selectedList.length - 1;
    const isLastItemOnAnotherList = selectedPosition === selectedList.length;

    if (selectedList.length > 0) {
      if (selectedPosition === 0) {
        setPos(Math.round(selectedList[0].pos / 2) - 1);
      } else if (isSameList && isLastIndex) {
        setPos(selectedList[selectedPosition].pos + 11000);
      } else if (isLastItemOnAnotherList) {
        setPos(selectedList[selectedPosition - 1].pos + 10000);
      } else if (isSameList && selectedPosition > index) {
        setPos(
          selectedList[selectedPosition].pos +
            (selectedList[selectedPosition + 1].pos -
              selectedList[selectedPosition].pos) /
              2,
        );
      } else {
        setPos(
          selectedList[selectedPosition].pos -
            (selectedList[selectedPosition].pos -
              selectedList[selectedPosition - 1].pos) /
              2,
        );
      }
    }
  };

  const handleMove = () => {
    dispatch(moveCard({ card, targetList, pos }));
    dispatch(closeEditPanel());
    setIsMoveOpen(false);
  };

  return {
    targetList,
    targetPosition,
    selectedList,
    currentList,
    setPos,
    getListsInfo,
    handleSelect,
    handlePosition,
    handleMove,
  };
};
