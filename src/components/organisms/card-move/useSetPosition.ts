import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'store';
import { CardType } from 'store/card-slice';

import { calculatePosition } from 'utils/calculatePosition';

import { useSetPositionProps } from './useSetPosition.types';

export const useSetPosition = ({
  card,
  index,
  listRef,
  positionRef,
  type,
}: useSetPositionProps) => {
  const cards = useSelector((state: RootState) => state.cards.cardsArray);

  const [currentList, setCurrentList] = useState<CardType[]>([]);
  const [selectedList, setSelectedList] = useState<CardType[]>([]);
  const [targetList, setTargetList] = useState('');
  const [targetPosition, setTargetPosition] = useState(0);
  const [pos, setPos] = useState(1000);

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

    if (selectedList.length > 0) {
      const calculatePositionResult = calculatePosition({
        targetIndex: selectedPosition,
        targetList: selectedList,
        previousIndex: index,
        previousList: currentList,
        type,
      });

      setPos(calculatePositionResult);
    }
  };

  return {
    targetList,
    targetPosition,
    selectedList,
    currentList,
    pos,
    setPos,
    getListsInfo,
    handleSelect,
    handlePosition,
  };
};
