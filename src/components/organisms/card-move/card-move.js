import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import { GrClose } from 'react-icons/gr';

import { Container } from './card-move-styles';
import { throwError } from 'store/error-slice';

export const CardMove = ({ rect, card, setIsMoveOpen, handleMove }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [allLists, setAllLists] = useState(null);
  const [currentList, setCurrentList] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [selectedListId, setSelectedListId] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(0);

  const { boardId } = useParams();

  const getListsInfo = () => {
    const fetchAllLists = async () => {
      try {
        const response = await axios.get(`/1/boards/${boardId}/lists`);
        setAllLists(response.data);
      } catch (error) {
        dispatch(throwError('Ooops something went wrong'));
      }
    };

    const fetchCurrentList = async () => {
      try {
        const response = await axios.get(`/1/lists/${card.idList}/cards`);
        setCurrentList(response.data);
        setSelectedList(response.data);
        setSelectedListId(response.data[0].idList);
      } catch (error) {
        dispatch(throwError('Ooops something went wrong'));
      }
    };

    fetchAllLists();
    fetchCurrentList();
  };

  const handleSelect = (e) => {
    const listId = e.target.value;

    const fetchSelectedList = async () => {
      try {
        const response = await axios.get(`/1/lists/${listId}/cards`);
        setSelectedList(response.data);
        setSelectedListId(response.data[0].idList);
        setSelectedPosition(
          response.data[response.data.length - 1].pos + 10000,
        );
      } catch (error) {
        dispatch(throwError('Ooops something went wrong'));
      }
    };

    fetchSelectedList();
  };

  const handlePosition = (e) => {
    const index = Number(e.target.value);

    if (index === 0) {
      setSelectedPosition(Math.round(selectedList[0].pos / 2) - 1);
    } else if (
      currentList[0].idList === selectedList[0].idList &&
      index === selectedList.length - 1
    ) {
      setSelectedPosition(selectedList[index].pos + 11000);
    } else if (index === selectedList.length) {
      setSelectedPosition(selectedList[index - 1].pos + 10000);
    } else {
      setSelectedPosition(
        selectedList[index].pos -
          Math.round(
            (selectedList[index].pos - selectedList[index - 1].pos) / 2,
          ),
      );
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
            {allLists &&
              selectedList &&
              selectedList.map((option, index) => (
                <option key={`option-${option.id}`} value={index}>
                  {index + 1}
                </option>
              ))}

            {currentList[0].idList !== selectedList[0].idList && (
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
