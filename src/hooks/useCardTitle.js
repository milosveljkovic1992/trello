import { useState, useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import axios from 'axios';

import { throwError } from 'store/error-slice';
import { updateCard } from 'store/cards-slice';
import { informListUpdate } from 'store/lists-slice';

export const useCardTitle = ({ card }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(card.name);

  const titleRef = useRef(null);

  const renameCard = async () => {
    try {
      const response = await axios.put(`/1/cards/${card.id}?name=${title}`);
      dispatch(updateCard(response.data));
      dispatch(informListUpdate(card.idList));
    } catch (error) {
      dispatch(throwError('Could not rename card'));
    }
  };

  const handleRename = (setIsActive) => {
    if (title.trim().length > 0) {
      renameCard();
    } else {
      setTitle(card.name);
      dispatch(throwError('Card name cannot be empty'));
    }
    setIsActive(false);
  };

  useEffect(() => {
    if (card.name !== title) {
      setTitle(card.name);
    }
  }, [card]);

  return { title, setTitle, handleRename, titleRef };
};
