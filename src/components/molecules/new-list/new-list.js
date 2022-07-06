import React, { useState } from 'react';

import axios from 'axios';

import { NewItem } from 'components/atoms';

export const NewList = ({
  setCreatingNewList,
  boardId,
  setIsBoardUpdated,
  pos,
}) => {
  const [userInput, setUserInput] = useState('');

  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  const submitList = async () => {
    const res = await axios.post(
      `/1/lists?name=${userInput}&pos=${pos}&idBoard=${boardId}`,
    );
    return res.data;
  };

  const handleSubmit = () => {
    try {
      submitList();
      setUserInput('');
      setCreatingNewList(false);
      setIsBoardUpdated(true);
    } catch (error) {
      console.log(error);
    }
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
