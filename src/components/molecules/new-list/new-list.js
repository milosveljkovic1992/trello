import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { submitList } from 'store/lists-slice';

import { NewItem } from 'components/atoms';

export const NewList = ({ setCreatingNewList, boardId, setIsBoardUpdated }) => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.listsArray);
  const [userInput, setUserInput] = useState('');

  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    if (userInput.trim().length > 0) {
      const pos = lists.length > 0 ? lists[lists.length - 1].pos + 5000 : 5000;
      dispatch(submitList({ userInput, boardId, pos }));
    }
    setIsBoardUpdated(true);
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
