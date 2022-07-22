import { useState } from 'react';

import { useDispatch } from 'react-redux';
import axios from 'axios';

import { throwError } from 'store/error-slice';

import { NewItem } from 'components/atoms';
import { addCard } from 'store/cards-slice';
import { informListUpdate } from 'store/lists-slice';

export const NewCard = ({ setIsCreatingNew, listId }) => {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState('');

  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    const submitCard = async () => {
      try {
        const response = await axios.post(
          `/1/card?idList=${listId}&name=${userInput}`,
        );
        dispatch(addCard(response.data));
        dispatch(informListUpdate(listId));
      } catch (error) {
        dispatch(throwError('New card could not be added'));
      }
    };

    if (userInput.trim().length > 0) {
      submitCard();
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