import { useState, useEffect, FormEvent } from 'react';

import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { GrClose } from 'react-icons/gr';

import { RootState } from 'store';
import type { CardType } from 'store/card-slice';
import { CardMoveProps } from './card-move.types';

import { Container } from './card-move-styles';

export const CardMove = ({
  rect,
  card,
  setIsMoveOpen,
  handleMove,
  index,
}: CardMoveProps) => {
  const allLists = useSelector((state: RootState) => state.lists.listsArray);
  const cards = useSelector((state: RootState) => state.cards.cardsArray);

  const [isLoading, setIsLoading] = useState(true);
  const [currentList, setCurrentList] = useState<CardType[]>([]);
  const [selectedList, setSelectedList] = useState<CardType[]>([]);
  const [targetList, setTargetList] = useState('');
  const [targetPosition, setTargetPosition] = useState(1);

  const getListsInfo = () => {
    setCurrentList(cards.filter(({ idList }) => card.idList === idList));
    setSelectedList(cards.filter(({ idList }) => card.idList === idList));
    setTargetList(card.idList);
  };

  const handleSelect = (e: FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;
    const listId = target.value;

    setSelectedList(cards.filter((card) => card.idList === listId));
    setTargetList(listId);
    setTargetPosition(1);
  };

  const handlePosition = (e: FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;
    const targetPosition = Number(target.value);

    const isSameList = currentList[0].idList === selectedList[0].idList;
    const isLastIndex = targetPosition === selectedList.length - 1;
    const isLastItemOnAnotherList = targetPosition === selectedList.length;

    if (selectedList.length > 0) {
      if (targetPosition === 0) {
        setTargetPosition(Math.round(selectedList[0].pos / 2) - 1);
      } else if (isSameList && isLastIndex) {
        setTargetPosition(selectedList[targetPosition].pos + 11000);
      } else if (isLastItemOnAnotherList) {
        setTargetPosition(selectedList[targetPosition - 1].pos + 10000);
      } else if (isSameList && targetPosition > index) {
        setTargetPosition(selectedList[targetPosition].pos + 1);
      } else {
        setTargetPosition(
          selectedList[targetPosition].pos -
            (selectedList[targetPosition].pos -
              selectedList[targetPosition - 1].pos) /
              2,
        );
      }
    }
  };

  useEffect(() => {
    if (!isLoading) {
      getListsInfo();
    }
    setIsLoading(false);
  }, [isLoading]);

  if (!allLists || !currentList) {
    return <></>;
  }

  return (
    <Container
      rect={rect}
      position={rect.x + 300 > window.innerWidth ? 'right' : 'left'}
    >
      <div className="icon-container" onClick={() => setIsMoveOpen(false)}>
        <GrClose />
      </div>

      <h3>Move card</h3>
      <h4>Select destination</h4>
      <div className="options-container">
        <div className="dropdown-container list-dropdown">
          <div className="dropdown-label">List</div>
          <select
            className="dropdown"
            onChange={handleSelect}
            value={targetList}
          >
            {allLists &&
              currentList.length > 0 &&
              allLists.map((option) => (
                <option key={`option-${option.id}`} value={option.id}>
                  {option.name}{' '}
                  {option.id === currentList[0].idList && '(current)'}
                </option>
              ))}
          </select>
        </div>

        <div className="dropdown-container position-dropdown">
          <div className="dropdown-label">Position</div>
          <select className="dropdown" onChange={handlePosition}>
            {allLists && selectedList.length > 0 ? (
              selectedList.map((option, index) => (
                <option key={`option-${option.id}`} value={index}>
                  {index + 1}
                </option>
              ))
            ) : (
              <option key={`option-${nanoid()}`} value={0}>
                1
              </option>
            )}

            {selectedList.length > 0 &&
              currentList[0].idList !== selectedList[0].idList && (
                <option value={selectedList.length}>
                  {selectedList.length + 1}
                </option>
              )}
          </select>
        </div>
      </div>
      <button onClick={() => handleMove(card, targetList, targetPosition)}>
        Move
      </button>
    </Container>
  );
};
