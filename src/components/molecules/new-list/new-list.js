import { useState } from 'react';

import { useDispatch } from 'react-redux';
import axios from 'axios';

import { throwError } from 'store/error-slice';

import { NewItem } from 'components/atoms';

export const NewList = ({
  setCreatingNewList,
  boardId,
  setIsBoardUpdated,
  pos,
}) => {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState('');

  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  const submitList = async () => {
    try {
      await axios.post(
        `/1/lists?name=${userInput}&pos=${pos}&idBoard=${boardId}`,
      );
    } catch (error) {
      dispatch(throwError('New list could not be added'));
    }
  };

  const handleSubmit = () => {
    if (userInput.trim().length > 0) {
      submitList();
      setIsBoardUpdated(true);
    }
    setUserInput('');
    setCreatingNewList(false);
  };

  return (
    <NewItem
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      setIsCreatingNew={setCreatingNewList}
      placeholder="Enter list title..."
    >
      Add list
    </NewItem>
  );
};
