import { useState, useEffect, useRef } from 'react';

import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';

import { RootState } from 'store';

import { useSetPosition } from './useSetPosition';
import { useCardMove } from './useCardMove';
import { useCardCopy } from './useCardCopy';

import { CardMoveProps } from './card-move.types';
import { Container } from './card-move-styles';

export const CardMove = ({
  rect,
  card,
  handleClosePanel,
  index,
  children,
}: CardMoveProps) => {
  const allLists = useSelector((state: RootState) => state.lists.listsArray);
  const [isLoading, setIsLoading] = useState(true);

  const listRef = useRef<HTMLSelectElement>(null);
  const positionRef = useRef<HTMLSelectElement>(null);

  const {
    targetList,
    targetPosition,
    selectedList,
    currentList,
    pos,
    setPos,
    getListsInfo,
    handleSelect,
    handlePosition,
  } = useSetPosition({
    card,
    index,
    listRef,
    positionRef,
    type: children as string,
  });

  const handleClick =
    children === 'Move'
      ? useCardMove({ card, targetList, pos, handleClosePanel })
      : useCardCopy({ card, targetList, pos, handleClosePanel });

  useEffect(() => {
    if (!isLoading) {
      getListsInfo();
    }
    setIsLoading(false);
  }, [isLoading]);

  useEffect(() => {
    if (selectedList.length > 0) {
      setPos(Math.round(selectedList[0].pos / 2) - 1);
    }
  }, [targetList]);

  if (!allLists || !currentList.length) {
    return <></>;
  }

  return (
    <Container
      rect={rect}
      position={rect.x + 300 > window.innerWidth ? 'right' : 'left'}
    >
      <div className="icon-container" onClick={handleClosePanel}>
        <GrClose />
      </div>

      <h3>{children === 'Move' ? 'Move card' : 'Copy card'}</h3>
      <h4>Select destination</h4>
      <div className="options-container">
        <div className="dropdown-container list-dropdown">
          <div className="dropdown-label">List</div>
          <select
            className="dropdown"
            onChange={handleSelect}
            value={targetList}
            ref={listRef}
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
          <select
            className="dropdown"
            onChange={handlePosition}
            value={targetPosition}
            ref={positionRef}
          >
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

            {currentList[0].idList !== targetList &&
              selectedList.length > 0 && (
                <option value={selectedList.length}>
                  {selectedList.length + 1}
                </option>
              )}
          </select>
        </div>
      </div>
      <button onClick={handleClick}>{children}</button>
    </Container>
  );
};
