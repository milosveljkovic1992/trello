import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { GrClose } from 'react-icons/gr';

import { Container } from './card-move-styles';
import { nanoid } from '@reduxjs/toolkit';

export const CardMove = ({ rect, card, setIsMoveOpen, handleMove, index }) => {
  const allLists = useSelector((state) => state.lists.listsArray);
  const cards = useSelector((state) => state.cards.cardsArray);

  const [isLoading, setIsLoading] = useState(true);
  const [currentList, setCurrentList] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [selectedListId, setSelectedListId] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(1);

  const getListsInfo = () => {
    setCurrentList(cards.filter(({ idList }) => card.idList === idList));
    setSelectedList(cards.filter(({ idList }) => card.idList === idList));
    setSelectedListId(card.idList);
  };

  const handleSelect = (e) => {
    const listId = e.target.value;

    setSelectedList(cards.filter((card) => card.idList === listId));
    setSelectedListId(listId);
    setSelectedPosition(1);
    console.log('handle select');
  };

  const handlePosition = (e) => {
    console.log('handle position');
    const targetPosition = Number(e.target.value);

    const isSameList = currentList[0].idList === selectedList[0].idList;
    const isLastIndex = targetPosition === selectedList.length - 1;
    const isLastItemOnAnotherList = targetPosition === selectedList.length;

    if (selectedList.length > 0) {
      if (targetPosition === 0) {
        setSelectedPosition(Math.round(selectedList[0].pos / 2) - 1);
      } else if (isSameList && isLastIndex) {
        setSelectedPosition(selectedList[targetPosition].pos + 11000);
      } else if (isLastItemOnAnotherList) {
        setSelectedPosition(selectedList[targetPosition - 1].pos + 10000);
      } else if (isSameList && targetPosition > index) {
        setSelectedPosition(selectedList[targetPosition].pos + 1);
      } else {
        setSelectedPosition(
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
            value={selectedListId}
          >
            {allLists &&
              currentList &&
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
      <button
        onClick={() => handleMove(card, selectedListId, selectedPosition)}
      >
        Move
      </button>
    </Container>
  );
};
