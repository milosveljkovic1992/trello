import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { NewItem } from 'components/atoms';
import { submitCard } from 'store/cards-slice';

export const NewCard = ({ setIsCreatingNew, listId }) => {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState('');

  const handleInput = (e) => {
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
