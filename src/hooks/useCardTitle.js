import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { renameCard } from 'store/card-slice';
import { throwError } from 'store/error-slice';

export const useCardTitle = ({ card }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(card.name);

  const handleRename = (setIsActive) => {
    const { id, idList } = card;

    if (title.trim().length > 0) {
      dispatch(renameCard({ id, title, idList }));
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

  return { title, setTitle, handleRename };
};
