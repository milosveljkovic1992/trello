import { useState, ChangeEvent } from 'react';

import { useAppDispatch } from 'store';
import { submitCard } from 'store/cards-slice';

import { NewCardProps } from 'components/atoms/new-card/new-card.types';

export const useNewCard = ({ setIsCreatingNew, listId }: NewCardProps) => {
  const dispatch = useAppDispatch();
  const [userInput, setUserInput] = useState('');

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    if (userInput.trim().length > 0) {
      dispatch(submitCard({ listId, userInput }));
    }
    setUserInput('');
    setIsCreatingNew(false);
  };

  return { handleInput, handleSubmit };
};
