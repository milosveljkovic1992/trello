import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { submitCard } from 'store/cards-slice';

export const useNewCard = ({ setIsCreatingNew, listId }) => {
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

  return { handleInput, handleSubmit };
};
