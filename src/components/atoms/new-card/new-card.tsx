import { useState, ChangeEvent } from 'react';

import { useAppDispatch } from 'store';
import { submitCard } from 'store/cards-slice';

import { NewCardProps } from './new-card.types';
import { NewItem } from 'components/atoms';

export const NewCard = ({ setIsCreatingNew, listId }: NewCardProps) => {
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

  return (
    <NewItem
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      setIsCreatingNew={setIsCreatingNew}
      placeholder="Enter a title for this card..."
    >
      Add Card
    </NewItem>
  );
};
