import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import axios from 'axios';

import { useAppDispatch } from 'store';
import { throwError } from 'store/error-slice';
import { updateCard } from 'store/cards-slice';
import { informListUpdate } from 'store/lists-slice';
import type { CardType } from 'store/card-slice';

import { useCardTitleProps } from './card-title.types';

export const useCardTitle = ({
  card,
}: {
  card: CardType;
}): useCardTitleProps => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(card.name);

  const renameCard = async () => {
    try {
      const response = await axios.put(`/1/cards/${card.id}?name=${title}`);
      dispatch(updateCard(response.data));
      dispatch(informListUpdate(card.idList));
    } catch (error) {
      dispatch(throwError('Could not rename card'));
    }
  };

  const handleRename = (
    setIsEditTitleActive: Dispatch<SetStateAction<boolean>>,
  ) => {
    if (title.trim().length > 0) {
      renameCard();
    } else {
      setTitle(card.name);
      dispatch(throwError('Card name cannot be empty'));
    }
    setIsEditTitleActive(false);
  };

  useEffect(() => {
    if (card.name !== title) {
      setTitle(card.name);
    }
  }, [card]);

  return { title, setTitle, handleRename };
};
